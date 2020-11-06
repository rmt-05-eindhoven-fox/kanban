const { request } = require("express");
const { Task } = require("../models");

class taskController{
    static async viewAllTask(request, response) {
        const userId = +request.loggedInUser.id;
        try {
            const data = await Task.findAll({
                // where: {
                //     category: "backlog"
                // },
                order: [["updatedAt", "ASC"]]
            });
            response.status(200).json(data);
        }catch(error) {
            next(error);
        }
    }

    static async addTask(request, response) {
        const userId = +request.loggedInUser.id;
        const newData = {
            title: request.body.title,
            category: request.body.category,
            UserId: userId
        }
        try {
            const data = await Task.create(newData);
            const result = {
                "id": data.id,
                "title": data.title,
                "category": data.category,
                "UserId": data.UserId
            }
            response.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async updateTask(request, response) {
        console.log("masuk");
        try {
            const userId = +request.loggedInUser.id;
            const taskId = +request.params.id;
            console.log(taskId);
            const newData = {
                title: request.body.title,
                category: request.body.category
            }
            const data = await Task.update(newData, {
                where: { UserId: userId, id: taskId },
                returning: true
            })
            response.status(200).json(data[1][0]);
        } catch (error) {
            //console.log(error);
            next(error)            
        }
    }

    static async updateTaskCategory(request, response, next) {
        try {
            const userId = +request.loggedInUser.id;
            const taskId = +request.params.id;
            const newData = { category: request.body.category };
            const data = await Task.update(newData, {
                where: { UserId: userId, id: taskId },
                returning: true
            })
            response.status(200).json(data[1][0]);
        } catch (error) {
            next(error)            
        }
    }

    static async delete(request, response) {
        try {
            const taskId = +request.params.id;
            const deleteTask = await Task.destroy({
                where: {id: taskId},
                returning: true
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = taskController;