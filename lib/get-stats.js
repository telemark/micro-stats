const mongojs = require('mongojs')
const logger = require('./logger')

module.exports = id => {
  return new Promise((resolve, reject) => {
    const db = mongojs(process.env.DB)
    const collection = db.collection(process.env.COLLECTION)
    const payload = { system: id }

    logger('info', ['get-stats', 'system', id])

    collection.find(payload, (error, documents) => {
      db.close()
      if (error) {
        logger('error', ['get-stats', id, JSON.stringify(error)])
        reject(error)
      } else {
        logger('info', ['get-stats', id, 'success', documents.length])
        resolve(documents)
      }
    })
  })
}
