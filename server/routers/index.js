const express = require('express')
const router = express.Router()
const routeUsers = require('./users')
const routeTasks = require('./task')

router.use('/', routeUsers)
router.use('/tasks', routeTasks)

module.exports = router