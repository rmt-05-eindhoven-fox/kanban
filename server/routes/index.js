const route = require('express').Router()
const controller = require('../controllers/controller')

route.post('/register', controller.signUp)

module.exports = route