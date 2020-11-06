const model = require("../models/index").task
const organization_member = require("../models/index").organization_member
const response = require("../helpers/response")

class TaskController{


    static Create(req, res, next){
        try {
            const data = req.body;
            const userId = req.loggedInUser.id
            const task = {
                title : data.title,
                description: data.description,
                status: data.status,
                due_date: data.due_date,
                organization_id: data.organization_id,
                creator_id: userId,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            model.create(task)
              .then(data=>{
                  res.status(201).json(response.onSuccess("success save task",data))
              })
              .catch(err=>{
                  next(err)
              });
         } catch (err) {
           next(err)
         }        
    }
    
    static GetTask(req, res, next){
        try {      
            const userId = req.loggedInUser.id
            model.findAll({where : {creator_id: userId}})
              .then(data=>{
                  res.status(200).json(response.onSuccess("success get task",data))
              })
              .catch(err=>{
                  next(err)
              })   
         } catch (err) {
           next(err)
         }        
    }

    static GetTaskByOrganizationId(req, res, next){
        try {      
            const userId = req.loggedInUser.id
            organization_member.findOne({where : 
            {
                organization_id: req.params.organization_id,
                user_id:userId
            }
            })
            .then(data=>{
                if(!data)
                  return res.status(400).json(response.onSuccess("not authorized",data))
                
                model.findAll({
                  where:{
                    organization_id: data.organization_id
                  }
                })
                .then(data=>{
                    res.status(200).json(response.onSuccess("success get task",data))
                })
                .catch(err=>{
                  next(err)
                })
            })
            .catch(err=>{
                  next(err)
            })   
         } catch (err) {
           next(err)
         }
    }

    static GetTaskById(req, res, next){
        try {      
            model.findOne({
              where:{
                id:req.params.id
              }
            })
              .then(data=>{
                    if(!data){
                        return res.status(400).json(response.onFailed("task not found"))                        
                    }              
                    res.status(200).json(response.onSuccess("success get taks",data))                        
              })
              .catch(err=>{
                  next(err)
              })
         } catch (err) {
           next(err)
         }        
    }

    static Update(req, res, next){
        try {      
            
            const data = req.body;
            const task = {
                title : data.title,
                description: data.description,
                status:  data.status,
                due_date:  data.due_date,
                updatedAt: new Date()
            }

            model.findByPk(req.params.id)
              .then(data=>{
                  if(!data){
                      return res.status(400).json(response.onFailed("task not found"))
                  }
                  data.update(task)
                  .then(data=>{
                      res.status(200).json(response.onSuccess("success update task",data))
                  })
                  .catch(err=>{
                    next(err)
                  })
              })
              .catch(err=>{
                    next(err)
              })
         } catch (err) {
           next(err)
         }        
    }


    static Delete(req, res, next){
        try {
            model.findByPk(req.params.id)
              .then(data=>{
                if(!data){
                  return  res.status(400).json(response.onFailed("task not found"))            
                }
                data.destroy()
                  .then(data=>{
                    res.status(200).json(response.onSuccess("success delete task",data))  
                })
              })
              .catch(err=>
                next(err)
              )
         } catch (err) {
           next(err)
         }        
    }

    static UpdateStatus(req, res, next){
        try {
            const data = req.body;
            const task = {
                status:  data.status,
                updatedAt: new Date()
            }

            model.findByPk(req.params.id)
              .then(data=>{
                if(!data){
                  return res.status(400).json(response.onFailed("task not found"))            
                }
                data.update(task)
                  .then(data=>{
                    res.status(200).json(response.onSuccess("success update status task",data))  
                  })
              })
              .catch(err=>
                next(err)
              )
         } catch (err) {
           next(err)
         }        
    }
}

module.exports = TaskController;