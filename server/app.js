if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT
const cors = require('cors')
const router = require('./routes')
const errorHandler = require('./middlewares/error-handler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.get('/', (req, res)=> res.status(200).json({msg: 'Welcome'}))
app.use(router)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`app running at http://localhost:${PORT}`)
})