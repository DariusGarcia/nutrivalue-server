const router = require('express').Router()

const userRoutes = require('./userRoutes')

router.use('/api/user', userRoutes)

module.exports = router
