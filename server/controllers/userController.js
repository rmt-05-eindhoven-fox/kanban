const { User, User_Organization } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
  static async register(req, res, next) {
    try {
      // create new user
      const payload = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
      }
      const user = await User.create(payload)
      // assign user to default organization
      const payload2 = {
        UserId: user.id,
        OrganizationId: 1,
        role: "Member"
      }
      const defaultOrg = await User_Organization.create(payload2)
      res.status(201).json({
        id: user.id,
        email: user.email
      })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const option = {
        where: { email }
      }
      const user = await User.findOne(option)
      if (!user) {
        throw { msg: 'Wrong email or password', status: 401 }
      } else if (!comparePassword(password, user.password)) {
        throw { msg: 'Wrong email or password', status: 401 }
      } else {
        const access_token = signToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({
          access_token,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          profile_picture: user.profile_picture
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static googleLogin(req, res, next) {

  }

  static async loggedInUserInfo(req, res, next) {
    try {
      const user = await User.findByPk(req.loggedInUser.id)
      const userInfo = {
        name: user.first_name + ' ' + user.last_name,
        email: user.email,
        profile_picture: user.profile_picture
      }
      res.status(200).json(userInfo)
    } catch (error) {
      next(error)
    }
  }

  static async editUsername(req, res, next) {
    try {
      const payload = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        profile_picture: `https://ui-avatars.com/api/?name=${req.body.first_name}+${req.body.last_name}&background=random&rounded=true`
      }
      const option = {
        where: {
          id: req.loggedInUser.id
        },
        returning: true
      }
      const edited = await User.update(payload, option)
      res.status(200).json(edited[1][0])
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async findOne(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id)
      res.status(200).json({
        name: user.first_name + ' ' + user.last_name,
        email: user.email,
        profile_picture: user.profile_picture
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController