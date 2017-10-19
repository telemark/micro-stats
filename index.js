const readFileSync = require('fs').readFileSync
const md = require('markdown-it')()
const { parse } = require('url')
const { json, send } = require('micro')
const match = require('micro-match')
const setStats = require('./lib/set-stats')
const getStats = require('./lib/get-stats')
const validateJwt = require('./lib/validate-jwt')

module.exports = async (request, response) => {
  const {query} = await parse(request.url, true)
  const {id} = match('/:stats?/:id', request.url)
  const data = request.method === 'POST' ? await json(request) : query
  let result = {}
  if (request.method === 'POST' && id !== undefined) {
    const bearerToken = request.headers.authorization
    if (bearerToken) {
      const token = bearerToken.replace('Bearer ', '')
      const decoded = await validateJwt(token)
      if (decoded) {
        try {
          const options = {
            id: id,
            data: data
          }
          result = await setStats(options)
        } catch (error) {
          result.error = error.message
        }
      } else {
        result.error = 'Invalid token'
      }
    } else {
      result.error = 'Missing token'
    }
  } else if (request.method === 'GET' && id !== undefined) {
    try {
      result = await getStats(id)
    } catch (error) {
      result.error = error.message
    }
  } else {
    const readme = readFileSync('./README.md', 'utf-8')
    result = md.render(readme)
  }
  let status = result.error ? 500 : 200
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
  send(response, status, result)
}
