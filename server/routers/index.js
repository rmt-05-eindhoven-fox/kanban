const router = require('express').Router()
const userRoutes = require('../routers/userRoutes')
const taskRoutes = require('../routers/taskRoutes')


router.use('/user', userRoutes)
router.use('/tasks', taskRoutes)


module.exports = router