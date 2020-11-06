const { Task } = require('../models')

module.exports = (req, res, next) => {
  let UserId = req.user.id
  console.log(UserId);
  let id = Number(req.params.id)
  Task.findOne({ where: { UserId, id }})
    .then(result => {
      if(!result) throw { msg: 'User not authorized'}
      else next()

      // res.status(200).json(result)
    })
    .catch(err => {
      res.status(401).json(err)
      // console.log('masuk sini');
    })
}