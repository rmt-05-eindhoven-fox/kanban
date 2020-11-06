const {organization,organization_member,user} = require("../models/index")
const response = require("../helpers/response")

class OrganizationController{
    static Create(req, res, next){
        try {
            const data = req.body
            const userId = req.loggedInUser.id
            const organizationData = {
                organization_name:data.name,
                organization_status:data.status,
                createdAt: new Date(),
                updatedAt: new Date()
            }


            organization.create(organizationData)
                .then(data=>{   
                    organization_member.create({
                        member_status:"author",
                        user_id:userId,
                        organization_id:data.id
                    })
                    .then(data_member=>{
                            res.status(201).json(response.onSuccess("success create organization",data))
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

    static Update(req, res, next){
        try {
            const data = req.body;
            const organizationData = {
                organization_name:data.name,
                organization_status:data.status,
                updatedAt: new Date()
            }

            organization.findByPk(req.params.id)
              .then(data=>{
                  if(!data){
                      return res.status(404).json(response.onFailed("organization not found"))
                  }
                  data.update(organizationData)
                  .then(data=>{
                      res.status(200).json(response.onSuccess("success update organization",data))
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
            let userId = req.loggedInUser.id
            organization.findOne({
                where:{
                    id:req.params.id
                },
                include:[
                        {
                            model:organization_member,
                            as:'members',
                            attributes: ['id','member_status','user_id'],
                            where:{ 
                                user_id: userId,
                                member_status:"author" 
                            }
                        }
                ]
            })
            .then(data=>{
                if(!data)
                    return res.status(400).json(response.onFailed("you are not author, please contact author to delete organization"))

                data.destroy()
                    .then(data=>{
                        res.status(200).json(response.onSuccess("success delete organization",data))  
                    })
                    .catch(err=>{
                        next(err)
                    })
            })
        } catch (err) {
            next(err)
        }
    }

    static GetOrganization(req, res, next){
        try {
            let userId = req.loggedInUser.id
            organization.findAll({
                include:[
                    {
                        model:organization_member,
                        as:'members',
                        attributes: ['id','member_status','user_id'],
                        where:{ 
                            user_id: userId 
                        }
                    }
                ]
            })
            .then(data=>{
                if(data.length == 0){
                    return res.status(404).json(response.onFailed("organization not found"))                        
                }              
                res.status(200).json(response.onSuccess("success get organization",data))                        

            })
            .catch(err=>{
                next(err)
            })
        } catch (err) {
            next(err)
        }
    }

    static GetOrganizationById(req, res, next){
        try {
            let organizationId = req.params.id
            organization.findOne({
                where:{
                    id:organizationId
                },
                include:[
                    {
                        model:organization_member,
                        as:'members',
                        attributes: ['id','member_status','user_id'],
                        include:[
                            {
                                model:user,
                                attributes: ['email'],
                            }
                        ]
                    }
                ]
            })
            .then(data=>{
                if(data.length == 0){
                    return res.status(404).json(response.onFailed("organization not found"))                        
                }              
                res.status(200).json(response.onSuccess("success get organization",data))                        

            })
            .catch(err=>{
                next(err)
            })
        } catch (err) {
            next(err)
        }
    }
    
}

module.exports = OrganizationController