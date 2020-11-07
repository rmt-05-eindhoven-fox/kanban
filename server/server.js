
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}

const express = require('express');
const createError = require('http-errors');
const router = require('./routes');
const cors = require('cors');
const errorHandler = require('./middleware/error-handler');
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(router)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'Sorry, an error has occured, Requested page not found!'));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App runing on ${process.env.BASE_URL}:${port}`)
})

