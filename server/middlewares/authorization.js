const { Task } = require('../models');

function authorization (req, res, next) {
  const { id } = req.params;

  Task.findByPk(id)
    .then(data => {
      if(!data) {
        throw { msg : 'Todo not found', status : 404};
      } else if(data.UserId === req.loginUser.id){
        next();
      } else {
        throw { msg : 'not Autorized', status : 401};
      }
    })
    .catch(err => {
      const status = err.status || 500;
      const msg = err.msg || 'Internal Server Error';

      res.status(status).json({ error : msg });
    })
}

module.exports = authorization;