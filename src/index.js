const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const jwt = require('express-jwt')

// Utilities
const handlers = require('./lib/handlers')
const config = require('./config')
const handleUnauthorized = require('./lib/handle-unauthorized')

// Initialize a new router
const router = Router()

// CORS
router.use(cors())

// JWT
router.use(jwt({ secret: config.JWT_SECRET }).unless({ path: [{ url: '/', methods: ['GET'] }, { url: /\/stats/i, methods: ['GET'] }] }))
router.use(handleUnauthorized)

// ROUTES
router.get('/', handlers.frontpage)
router.post('/stats/:id', handlers.setStats)
router.get('/stats/:id', handlers.getStats)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
