const { User, Task } = require('../models')

async function authorization(req, res, next) {
  try {
    const userActiv = req.userActiv
    const deletedId = req.params.id

    const data = await Task.findByPk(deletedId)
    console.log(data)
    console.log(userActiv.id, data.UserId)
    if (!data) {
      throw ({ msg: 'data tidak ditemukan', status: 400 })
    } else {
      if (data.UserId === userActiv.id) {
        next()
      } else {
        throw ({ msg: 'Bukan HAK KAMU HAPUS PUNYA ORANG', status: 400 })
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authorization