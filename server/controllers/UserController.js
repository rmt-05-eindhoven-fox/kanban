const { User } = require('../models/')

class UserController {

  static async postRegisterUser(req, res, next) {
    try {
      let { name, email, password } = req.body

      const searchUser = await User.findOne({
        where : { email }
      })

      if(!searchUser) {

        const newUser = await User.create({
          name, email, password
        })

        res.status(201).json({
          message : `User successfully created`,
          newUser
        })

      } else {
        next({
          status : 400,
          message : `Email already exists`
        })
      }
      
    } catch (error) {
      next(error)
    }
  }

}

module.exports = UserController