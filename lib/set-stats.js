const mongo = require('./mongo')
const logger = require('./logger')

module.exports = async options => {
  const db = await mongo()
  const collection = db.collection(process.env.MONGODB_COLLECTION)
  const payload = Object.assign(options.data, { system: options.id })
  logger('info', ['set-stats', 'system', options.id])
  try {
    const document = await collection.findOneAndUpdate({ system: options.id }, { $set: payload }, { upsert: true })
    logger('info', ['set-stats', options.id, 'success'])
    return document
  } catch (error) {
    logger('error', ['set-stats', options.id, JSON.stringify(error)])
    throw error
  }
}
