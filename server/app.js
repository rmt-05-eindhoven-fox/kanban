const express = require('express')
require('dotenv').config()
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)
app.use(errorHandler) 

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}/login`)
})