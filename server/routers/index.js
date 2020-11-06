const router = require('express').Router()
const userRoutes = require('../routers/userRoutes')
const taskRoutes = require('../routers/taskRoutes')
const authentication = require('../middlewares/authentication')

// router.get('/', (req,res) => {
//   res.status(200).json({
//     message : "Hello from index router"
//   })
// })

router.use('/user', userRoutes)
router.use('/tasks', taskRoutes)

// router.use(authentication)

module.exports = router