const { Task } = require('../models');

class TaskController {

  static findAll(req, res, next) {
    Task.findAll()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err)
      })
  }

  static create(req, res, next) {
    const userId = req.loginUser.id;

    let obj = {
      title: req.body.title,
      UserId: userId,
      CategoryId: req.body.CategoryId
    }
    Task.create(obj)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err);
      })
  }

  static findId(req, res, next) {
    const idTask = +req.params.id;
    Task.findOne({where : {'id': idTask}})
      .then(data => {
        if(data){
          res.status(200).json(data);
        } else {
          res.status(404).json({"error": "Task Not Found"})
        }
      })
      .then(err => {
        next(err)
      })
  }

  static update(req, res, next) {
    const idTask = +req.params.id;
    const obj = {
      title: req.body.title,
      CategoryId: req.body.CategoryId
    }

    Task.update(obj, { where : {'id' : idTask}, returning: true})
      .then(data => {
        res.status(201).json(data[1]);
      })
      .catch(err => {
        next(err)
      })
  }

  static updateCat(req, res, next) {
    const idTask = +req.params.id;
    const obj = {
      CategoryId: req.body.CategoryId
    }

    Task.update(obj, { where : {'id': idTask}, returning: true})
      .then(data => {
        res.status(201).json(data[1]);
      })
      .catch(err => {
        next(err)
      })
  }

  static delete(req, res, next) {
    const idTask = +req.params.id;
    
    Task.destroy({ where : {'id': idTask}})
      .then(data => {
        res.status(201).json({ msg : 'Deleted Success'})
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = TaskController