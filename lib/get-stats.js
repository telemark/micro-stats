'use strict'

const config = require('../config')
const mongojs = require('mongojs')
const db = mongojs(config.DB)
const collection = db.collection(config.COLLECTION)
const logger = require('./logger')

module.exports = id => {
  return new Promise((resolve, reject) => {
    const payload = {system: id}

    logger('info', ['get-stats', 'system', id])

    collection.find(payload, (error, documents) => {
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
