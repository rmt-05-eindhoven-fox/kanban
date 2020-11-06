const { Task, OrganizationUser, UserTask, Organization } = require("../models/") 

class TaskController {

    static async joinOrganization(req, res, next) {
        const { org_code } = req.body
        const UserId = req.headers.id

        try {
            const result = await Organization.findOne({
                org_code
            })
            
            if(!result) {
                throw {msg: 'Organization Not Found'}
            } else {
                const assigned = await OrganizationUser.create({
                    OrganizationId: result.id,
                    UserId
                })
                res.status(201).json({msg: `You have successfully joined this organizations`})
            }
        } catch (err) {
            next(err)
        }
    }

    static async readTask(req, res, next) {
        const OrganizationId = req.params.id
        
        try {
            const result = await Task.findAll({
                where: {
                    OrganizationId
                }
            })
            res.status(200).json({result})
        } catch (err) {
            next(err)
        }
    }

    static async createTask(req, res, next) {
        const { title, category, status } = req.body
        const OrganizationId = req.params.id
        const UserId = req.isSignedIn.id

        try {
            const result = await Task.create({
                title,
                category,
                status,
                OrganizationId
            })
            const userTaskUpdated = await UserTask.create({
                UserId: UserId,
                TaskId: result.id
            })
            res.status(201).json({result})
        } catch (err) {
            next(err)
        }
    }

    static async editTask(req, res, next) {
        const { title, category, status } = req.body
        const id = req.params.id

        try {
            const result = await Task.update({
                title,
                category,
                status
            },
            {
                where: {
                    id
                },
                returning: true
            })
            res.status(200).json({result})
        }
        catch(err) {
            next(err)
        }
    }

    static async changeStatus(req, res, next) {
        const id = req.params.id

        const { status } = req.body

        try {
            const result = await Task.update({
                status
            }, {
                where: {
                    id
                }
            })
            res.status(200).json('status changed successfully')
        } catch (err) {
            next(err)
        }
    }

    static async deleteTask(req, res, next) {
        const id = req.params.id
        
        try {
            const result = await Task.destroy({
                where: {
                    id
                }
            })
            res.status(200).json('Task deleted successfully!')
        } catch (err) {
            next(err)
        }
    }
}

module.exports = TaskController