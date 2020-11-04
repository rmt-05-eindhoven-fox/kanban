if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}

const express = require('express');
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', router)
app.use(errorHandler)

app.listen(port, () => console.log(`app is listening at http://localhost:${port}`))