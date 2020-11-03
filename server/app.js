require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT
const router  = require('./routes/index')
const errorHandler = require('./middlewares/errorHandling')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(router)
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})