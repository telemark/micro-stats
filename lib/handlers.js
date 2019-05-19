const { json, send } = require('micro')
const setStats = require('./set-stats')
const getStats = require('./get-stats')
let cache = {}

exports.getStats = async (request, response) => {
  const { id } = request.params
  let result = {}
  const cached = cache[id]
  if (!cached) {
    try {
      result = await getStats(id)
      cache[id] = result
    } catch (error) {
      result.error = error.message
    }
  } else {
    result = cached
  }
  const status = result.error ? 500 : 200
  send(response, status, result)
}

exports.setStats = async (request, response) => {
  const { id } = request.params
  const data = await json(request)
  let result = {}
  try {
    const options = {
      id: id,
      data: data
    }
    result = await setStats(options)
  } catch (error) {
    result.error = error.message
  }
  const status = result.error ? 500 : 200
  send(response, status, result)
}
