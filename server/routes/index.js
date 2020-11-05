const router = require('express').Router()
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const organizationRouter = require('./organizationRouter')
const tagRouter = require('./tagRouter')
const taskRouter = require('./taskRouter')
const notificationRouter = require('./notificationRouter')

const authentication = require('../middlewares/authentication')

router.use(userRouter)

router.use(authentication)

router.use('/organizations', organizationRouter)
router.use('/categories', categoryRouter)
router.use('/tasks', taskRouter)
router.use('/tags', tagRouter)
router.use('/notifications', notificationRouter)

module.exports = router