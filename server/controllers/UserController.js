const { User } = require('../models/')
const { generateToken, decodeToken } = require('../helpers/jwt')
const { verifyPassword } = require('../helpers/bcrypt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ID);

class UserController {

  static async postRegisterUser(req, res, next) {
    try {
      let { name, email, password } = req.body

      const searchUser = await User.findOne({
        where : { email }
      })

      console.log(searchUser)

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

  static async postLoginUser(req, res, next){
    // find email in DB
    // if yes, check if password match
    // if yes, send back token
    try {
      const { email, password } = req.body

      const userInDB = await User.findOne({
        where : { email }
      })

      if(userInDB){

        if(verifyPassword(password, userInDB.password)){
          const access_token = generateToken({
            id : userInDB.id,
            email : userInDB.email
          })

          res.status(200).json({ access_token })

        } else {
          next({
            status : 400,
            message : `Wrong username/password`
          })

        }

      } else {
        next({
          status : 400,
          message : `Wrong username/password`
        })
      }
      
     
      
    } catch (error) {
      next(error)
    }

  }

  static async postLoginGoogle(req, res, next) {
    try {
      const { google_access_token } = req.headers
      const ticket = await client.verifyIdToken({
        idToken : google_access_token,
        audience : process.env.GOOGLE_ID
      })

      const payload = ticket.getPayload()
      
      let { name, email } = payload
      const password = 'defaultPassword'

      let user = await User.findOne({ where : { email }})

      if(!user){
        user = await User.create({
          name,
          email,
          password
        })

      } 

      const access_token = generateToken({ id : user.id, email:user.email })

      res.status(200).json({ access_token })

    } catch (error) {
      next(error)
    }


  }

  static async getUsers(req, res, next) {
    try {
      
      const users = await User.findAll({
        attributes : {
          exclude : ['password', 'updatedAt', 'createdAt']
        }
      })

      res.status(200).json(users)

    } catch (error) {
      next(error)
    }
  }

}

module.exports = UserController