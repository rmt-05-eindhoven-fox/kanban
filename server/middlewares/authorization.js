const {organization,organization_member,task} = require('../models/index')
 
const response = require('../helpers/response')


function authorization(req, res, next,name=""){     
    if(req.baseUrl === "/organizations"){
        organization.findByPk(req.params.id)
            .then((dataOrganization) => {
                if(!dataOrganization){
                    throw {message: "organization not found"}
                } else {
                    organization_member.findOne({
                        where:{
                            user_id:req.loggedInUser.id
                        }
                    })
                    .then(data=>{
                        if(data)
                            next()
                        else
                            throw {message: "not authorized"}
                    })
                    .catch(err=>{
                        next(err)
                    })
                }
        })
        .catch((err) => {
            const message = err.message || {message: "invalid requests"}
            res.status(400).json(response.onFailed(message))
        })
    }else if(req.baseUrl === '/members'){
        const authorId = req.loggedInUser.id
        const user_id = req.body.user_id || req.params.userid || ""
        const organization_id = req.body.organization_id || req.params.organizationid || ""

        organization_member.findOne({
            where:{
                user_id:authorId,
                organization_id:organization_id
            }
        })
        .then(data=>{
            if(!data)
                throw {message: "not authorized"}
            
            next()            
        })
        .catch(err=>{
            next(err)
        })
    }else if(req.baseUrl == "/tasks"){
        const user_id = req.loggedInUser.id
        let organization_id = req.body.organization_id || req.params.organization_id || ""

        if(organization_id == ""){
            const task_id = req.params.id || ""            
            task.findOne({
                where:{
                    id:task_id
                }
            })
            .then(data=>{
                if(!data)
                    throw {message: "task not found"}
                
               organization_id = data.organization_id                  

               organization_member.findOne({
                    where:{
                        user_id:user_id,
                        organization_id:organization_id
                    }
                })
                .then(data=>{
                    if(!data)
                        throw {message: "not authorized"}
                    
                    next()            
                })
                .catch(err=>{
                    next(err)
                })                
            })
            .catch(err=>{
                next(err)
            })            
        }else{
            organization_member.findOne({
                where:{
                    user_id:user_id,
                    organization_id:organization_id
                }
            })
            .then(data=>{
                if(!data)
                    throw {message: "not authorized"}
                    
                next()            
            })
            .catch(err=>{
                next(err)
            })            
        }
        

    }else{
        next()
    }
}

module.exports = authorization 