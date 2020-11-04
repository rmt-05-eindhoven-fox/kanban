require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT
const routes = require('./routes/router')
const errorHandler = require('./middlewares/errorhandler')
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(routes)
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Apps Running at port ${PORT}`)
})