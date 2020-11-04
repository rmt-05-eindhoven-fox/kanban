if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const router = require('./routers/')

app.use(express.urlencoded({ extended : false }))
app.use(express.json())
app.use(cors())


app.use(router)
// 🐶 TODO : error handler 

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})