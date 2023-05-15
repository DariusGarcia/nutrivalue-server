const router = require('express').Router()
const userRoutes = require('./userRoutes')
const mealRoutes = require('./mealRoutes')

router.use('/api/user', userRoutes)
router.use('/api/meals', mealRoutes)

module.exports = router
