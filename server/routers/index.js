const router = require('express').Router()
const userRoutes = require('../routers/userRoutes')
// 🐶 TODO : authentication

router.get('/', (req,res) => {
  res.status(200).json({
    message : "Hello from index router"
  })
})

router.use('/user', userRoutes)

module.exports = router