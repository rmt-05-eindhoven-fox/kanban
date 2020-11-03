
class UserController {

  static login(req, res, next) {
    res.status(200).json({ status: 'OK' })
  }

  static register(req, res, next) {
    res.status(200).json({ status: 'OK' })
  }
}

module.exports = UserController;