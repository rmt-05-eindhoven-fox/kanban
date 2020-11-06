const {Task} = require("../models/")

async function authorization(req,res,next){
  try {
    const id = +req.params.id
    const data = await Task.findByPk(id)
    if(!data){
      throw {error:"NotAuthorized"}
    }else if(data.UserId === req.loggedInUser.id){
      next()
    }else{
      throw {error:"NotAuthorized"}
    }
  } catch (error) {
    res.status(403).json({error});
  }
}

module.exports = authorization