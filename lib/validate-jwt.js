'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')
const logger = require('./logger')

module.exports = token => {
  return new Promise((resolve, reject) => {
    if (!token) {
      logger('error', ['validate-jwt', 'Missing token'])
      throw Error('Missing required input: token')
    }
    jwt.verify(token, config.JWT_SECRET, (error, decoded) => {
      if (error) {
        logger('error', ['validate-jwt', JSON.stringify(error)])
        return reject(error)
      } else {
        logger('info', ['validate-jwt', 'success'])
        return resolve(decoded)
      }
    })
  })
}
