require('dotenv').config()
const express = require('express')
const routers = require('./routers/index')
const app = express()
const port = process.env.PORT
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/', routers)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`connected http://localhost:${port}`)
})