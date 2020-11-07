const router = require('express').Router()
const user_routes = require('./user-routes')
const task_routes = require('./task-controller')

router.use('/', user_routes)
router.use('/task', task_routes)

module.exports = router