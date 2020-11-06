const {organization,organization_member,user} = require("../models/index")
const response = require("../helpers/response")
const mailer = require('../helpers/mailer')

class MemberController{
    static Create(req, res, next){
        try {
            const data = req.body
            const userId = req.loggedInUser.id
            const member = {
                user_email:data.user_email || "",
                organization_id:data.organization_id || "",
                member_status:'user',
                createdAt: new Date(),
                updatedAt: new Date()
            }

            user.findOne({
                where:{
                    email:member.user_email
                }
            })
            .then(data=>{
                if(!data)
                    return res.status(400).json(response.onFailed("can't register a member, email does not exists"))

                member["user_id"] = data.id                
                organization_member.findOne({
                    where:{
                        user_id:userId,
                        organization_id:member.organization_id,
                    }
                }).then(data=>{
                    
                    if(data.member_status != "author")
                        return res.status(400).json(response.onFailed("can't register a member, please contact author to add member"))

                    organization_member.findOne({
                        where:{
                            user_id:member.user_id,
                            organization_id:member.organization_id 
                        }
                    })
                    .then(data=>{
                        if(data)
                            return res.status(409).json(response.onFailed("member already register in organization"))

                        organization_member.create(member)
                        .then(data=>{
                            mailer.sendMail(member.user_email,"Added member","you added to organization, please check todo in organization")                            
                            return res.status(201).json(response.onSuccess("success register member",data))                    
                        })
                        .catch(err=>{
                            next(err)
                        }) 
                    })
                    .catch(err=>{
                        next(err)
                    })
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
                organization_member.findOne({
                    where:{
                        user_id:userId,
                        organization_id:req.params.organizationid,
                    }
                }).then(data=>{
                    if(data.member_status != "author")
                        return res.status(400).json(response.onFailed("can't delete a member, please contact author to delete member"))


                        organization_member.findOne({
                            where:{
                                organization_id:req.params.organizationid,
                                user_id:req.params.userid,
                            }
                        })
                        .then(data=>{
                            if(!data)
                                return res.status(400).json(response.onFailed("member not found"))

                            if(data.member_status == "author")
                                return res.status(400).json(response.onFailed("can't delete the author, please delete user only"))

                            data.destroy()
                                .then(data=>{
                                    res.status(200).json(response.onSuccess("success delete member",data))  
                                })
                                .catch(err=>{
                                    next(err)
                                })
                        })

                            })        
                .catch(err=>{
                    next(err)
                })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = MemberController