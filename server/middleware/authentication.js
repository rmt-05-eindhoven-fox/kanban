const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models/")

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers
    if (!access_token) {
      throw { error: "not authenticated" }
    } else {
   data = verifyToken(access_token)
      const user = await User.findOne({ where: { email: data.email } })
      if (!user) {
        throw { error: "not authenticated" }
      } else {
        req.loggedInUser = user
        next()
      }

    }
  } catch (error) {
    res.status(401).json({ error })
  }

}

module.exports = authentication