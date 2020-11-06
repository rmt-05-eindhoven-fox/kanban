if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}
const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router  = require('./routes/index')
const errorHandler = require('./middlewares/errorHandling')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(router)
app.use(errorHandler)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})