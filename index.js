const setStats = require('./lib/set-stats')
const getStats = require('./lib/get-stats')
const validateToken = require('./lib/validate-token')
const logger = require('./lib/logger')
const cache = {}

module.exports = async (request, response) => {
  const id = request.url.split('/').pop().toLowerCase()
  const method = request.method.toLowerCase()
  let result = {}

  if (method === 'get') {
    const cached = cache[id]
    if (!cached) {
      try {
        result = await getStats(id)
        cache[id] = result
      } catch (error) {
        logger('error', ['get', error])
      }
    } else {
      result = cached
    }
  } else if (method === 'post') {
    const bearerToken = request.headers.authorization
    if (!bearerToken) {
      const msg = 'missing Authorization header'
      logger('warn', ['set', msg])
      response.status(401)
      response.send('missing Authorization header')
      return
    }
    try {
      const token = bearerToken.replace('Bearer ', '')
      await validateToken(token)
    } catch (error) {
      logger('error', ['token-auth', error])
      response.status(401)
      response.send('invalid token in Authorization header')
      return
    }
    try {
      const data = request.body
      const options = {
        id: id,
        data: data
      }
      result = await setStats(options)
    } catch (error) {
      logger('error', ['set', error])
    }
  }
  response.json(result)
}
