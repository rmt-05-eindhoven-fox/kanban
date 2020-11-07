require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT
const routes = require('./routes/index')
const error_handler = require('./middlewares/error_handler')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors())
app.use(routes)
app.use(error_handler)

app.listen(port, ()=>{
    console.log(`Litening to port ${port}`);
})