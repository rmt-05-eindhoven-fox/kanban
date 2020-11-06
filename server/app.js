require('dotenv').config()
const 
  cors = require('cors'),
  express = require('express'),
  app = express(),
  routes = require('./routes'),
  error = require('./middlewares/error')
  PORT = Number(process.env.PORT)
;

app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(routes)

app.use(error)

app.listen(PORT, _=> console.log("listening"));
