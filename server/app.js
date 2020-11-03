if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routers/index.js')
const errorHandler = require('./middleware/errorHandler')


app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/', router)
app.use(errorHandler)


app.get('/', (req, res) => {
  res.status(201).json({
    msg: 'Kanban Test!!'
  })
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})