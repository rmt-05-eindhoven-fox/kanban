const router = require('express').Router()
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const organizationRouter = require('./organizationRouter')

const authentication = require('../middlewares/authentication')

router.use(userRouter)

router.use(authentication)

router.use('/organizations', organizationRouter)
router.use('/categories', categoryRouter)

module.exports = router