const mongojs = require('mongojs')
const logger = require('./logger')

module.exports = options => {
  return new Promise((resolve, reject) => {
    const db = mongojs(process.env.DB)
    const collection = db.collection(process.env.COLLECTION)
    const payload = Object.assign(options.data, { system: options.id })
    const mongoOptions = {
      query: { system: options.id },
      update: { '$set': payload },
      new: true,
      upsert: true
    }

    logger('info', ['set-stats', 'system', options.id])

    collection.findAndModify(mongoOptions, (error, document) => {
      db.close()
      if (error) {
        logger('error', ['set-stats', options.id, JSON.stringify(error)])
        reject(error)
      } else {
        logger('info', ['set-stats', options.id, 'success'])
        resolve(document)
      }
    })
  })
}
