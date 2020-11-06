const express = require('express')
const router = require('./routes/')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)
app.use(errorHandler)

app.listen(port, console.log('app listening on port:', port))