const router = require('express').Router()
const userRoutes = require('./userRoutes')
const mealRoutes = require('./mealRoutes')
const requireAuth = require('../middleware/requireAuth')

router.use('/api/user', userRoutes)
router.use('/api/meals', requireAuth, mealRoutes)

module.exports = router
