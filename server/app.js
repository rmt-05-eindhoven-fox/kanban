require('dotenv').config()

const express = require('express')
const cors = require('cors')

const port = 3000
const app = express()
const router = require('./router/index')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log('http://localhost:' + port)
})