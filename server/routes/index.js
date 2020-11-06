const router = require('express').Router()
const taskRoutes = require('./task')
const userRoutes = require('./user')

router.use('/', taskRoutes)
router.use('/', userRoutes)

module.exports = router