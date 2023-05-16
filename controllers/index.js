const router = require('express').Router()
const userRoutes = require('./userRoutes')
const mealRoutes = require('./mealRoutes')
const foodSearchRoutes = require('./foodSearchRoutes')
const requireAuth = require('../middleware/requireAuth')

router.use('/api/user', userRoutes)
router.use('/api/meals', requireAuth, mealRoutes)
router.use('/api/food', requireAuth, foodSearchRoutes)

module.exports = router
