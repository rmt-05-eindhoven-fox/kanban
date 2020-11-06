require('dotenv').config()
const errorHandler = require('./middleware/errorHandler')
const express = require('express')
const app = express()
const port = process.env.port
const router = require('./routes/index.js')
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`this app running at port:${port}`)
})