const app = require('express').Router()
const UserController = require('../controllers/user')

app.post('/register', UserController.register)

app.post('/login', UserController.login)

app.post('/googleLogin', UserController.googleLogin)

module.exports = app