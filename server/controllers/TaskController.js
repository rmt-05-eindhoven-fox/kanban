const {
   Task, User
} = require('../database/models')

class TaskController {
   static async getAllTask(req, res, next) {

      const UserId = req.userLogin.id

      try {
         // const task = await Task.findAll({
         //    where: {
         //       UserId
         //    },
         // })

         const task = await Task.findAll({
            include: User
         })

         res.status(200).json(task)
      } catch (err) {
         next(err)
      }
   }

   static async createTask(req, res, next) {
      try {
         const newTask = {
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            UserId: req.userLogin.id
         }

         const task = await Task.create(newTask)

         res.status(201).json(task)
      } catch (err) {
         next(err)
      }
   }

   static async getTaskById(req, res, next) {
      try {
         const id = +req.params.id

         const task = await Task.findByPk(id)
         if (!task) {
            throw {
               status: 401,
               message: 'Task Not Found'
            }
         } else {
            res.status(200).json(task)
         }
      } catch (err) {
         next(err)
      }
   }

   static async editTaskById(req, res, next) {
      try {
         const id = +req.params.id

         const editedTask = {
            title: req.body.title,
            category: req.body.category,
            description: req.body.description
         }
         const task = await Task.update(editedTask, {
            where: {
               id
            },
            returning: true
         })

         res.status(201).json(task[1][0])
      } catch (err) {
         next(err)
      }
   }

   static async editTaskCategoryById(req, res, next) {
      try {
         const id = +req.params.id

         const editedTask = {
            category: req.body.category,
         }
         const task = await Task.update(editedTask, {
            where: {
               id
            },
            returning: true
         })

         res.status(201).json(task[1][0])
      } catch (err) {
         next(err)
      }
   }

   static async deleteTaskById(req, res, next) {
      try {
         const id = +req.params.id
         
         const task = await Task.destroy({where: {id}})

         res.status(201).json({
            message: 'Task Successfully Deleted'
         })
      } catch (err) {
         next(err)
      }
   }


}

module.exports = TaskController