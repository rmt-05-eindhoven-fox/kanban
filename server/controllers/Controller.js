const { User, Task } = require('../models/')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class Controller {
  static homePage(req, res, next) {
    res.status(200).json('hai')
  }
  static register(req, res, next) {
    let { email, password } = req.body
    User.create({
      email, password 
    })
      .then(data => {
        res.status(201).json({id: data.id, email: data.email})
      })
      .catch(err => {
        next(err)
      })
  }
  static login(req, res, next) {
    let { email, password } = req.body
    User.findOne({
      where: {
        email
      }
    })
      .then(data => {
        if (!data) {
          next({
            name: 'Wrong email/password!',
            status: 400
          })
        } else if (comparePassword(password, data.password)) {
          let access_token = signToken({
            id: data.id,
            email: data.email
          })
          res.status(200).json({access_token})
        } else {
          throw { name: 'Wrong email/password!', status: 400 }
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static googleLogin(req, res, next) {
    let { id_token } = req.body
    const client = new OAuth2Client('247567052940-achnlp6p8btmuka5u98n1thu5gsd9ds7.apps.googleusercontent.com');
    let email = ''
    client.verifyIdToken({
      idToken: id_token,
      audience: '247567052940-achnlp6p8btmuka5u98n1thu5gsd9ds7.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
    })
      .then(tiket => {
      const payload = tiket.getPayload();

      email = payload.email
      return User.findOne({
        where: {
          email: payload.email
        }
      })
    })
      .then(user => {
        if (user) {
          return user
        } else {
          let userObj = {
            email,
            password: 'randomaja'
          }
          return User.create(userObj)
        }
      })
      .then(dataUser => {
        const access_token = signToken({
          id: dataUser.id,
          email: dataUser.email
        })
        res.status(200).json({access_token})
      })
      .catch(err => {
      console.log(err)
      next(err)
    })
  }
  static createCard(req, res, next) {
    let {id, email} = req.loggedInUser
    let { title, category } = req.body

    Task.create({
      title, category, UserId: id
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static showAll(req, res, next) {
    Task.findAll({
      include: {
        model: User
      }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static delete(req, res, next) {
    let { id } = req.params

    Task.destroy({
      where: {
        id
      }
    })
      .then(data => {
        res.status(200).json('card success to delete')
      })
      .catch(err => {
        next(err)
      })
  }
  static update(req, res, next) {
    let { id } = req.params
    const UserId = req.loggedInUser.id
    const { title, category } = req.body

    Task.update(
      { title, category },
      { where: { id, UserId }, returning: true}
    )
      .then(data => {
        if (data[0] === 0) {
          throw { name: 'Update failed!'}
        }
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = Controller