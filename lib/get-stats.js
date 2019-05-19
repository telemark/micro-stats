const mongo = require('./mongo')
const logger = require('./logger')

module.exports = async id => {
  const db = await mongo()
  const collection = db.collection(process.env.MONGODB_COLLECTION)
  const payload = { system: id }

  logger('info', ['get-stats', 'system', id])

  try {
    const documents = await collection.find(payload).toArray()
    logger('info', ['get-stats', id, 'success', documents.length])
    return documents
  } catch (error) {
    logger('error', ['get-stats', id, JSON.stringify(error)])
    throw error
  }
}
