const { readFileSync } = require('fs')
const md = require('markdown-it')()
const { json, send } = require('micro')
const setStats = require('./set-stats')
const getStats = require('./get-stats')
const logger = require('./logger')

exports.frontpage = async (request, response) => {
  logger('info', ['handlers', 'frontpage'])
  const readme = readFileSync(`${__dirname}/../README.md`, 'utf-8')
  send(response, 200, md.render(readme))
}

exports.getStats = async (request, response) => {
  const { id } = request.params
  let result = {}
  try {
    result = await getStats(id)
  } catch (error) {
    result.error = error.message
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
