require('dotenv').config()
const 
  cors = require('cors'),
  express = require('express'),
  app = express(),
  routes = require('./routes'),
  PORT = Number(process.env.PORT)
;

app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(routes)

app.listen(PORT, _=> console.log("listening"));
