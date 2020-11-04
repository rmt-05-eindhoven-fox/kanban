const router = require('express').Router()
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')

const authentication = require('../middlewares/authentication')

router.use(userRouter)

router.use(authentication)

router.use('/categories', categoryRouter)

module.exports = router