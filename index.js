const url = require('url')
const { json } = require('micro')
const setStats = require('./lib/set-stats')
const getStats = require('./lib/get-stats')
const validateToken = require('./lib/validate-token')
const logger = require('./lib/logger')
let cache = {}

module.exports = async (request, response) => {
  const pathname = url.parse(request.url).pathname
  const id = pathname.split('/').pop().toLowerCase()
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
      response.writeHead(401)
      response.end('missing Authorization header')
      return
    }
    try {
      const token = bearerToken.replace('Bearer ', '')
      await validateToken(token)
    } catch (error) {
      logger('error', ['token-auth', error])
      response.writeHead(401)
      response.end('invalid token in Authorization header')
      return
    }
    try {
      const data = await json(request)
      const options = {
        id: id,
        data: data
      }
      result = await setStats(options)
    } catch (error) {
      logger('error', ['set', error])
    }
  }
  response.writeHead(200)
  response.end(JSON.stringify(result, null, 2))
}
