const {User} = require("../models")
const {Task} = require("../models")
const {comparePassword} = require("../helpers/bcrypt")
const {signToken} = require("../helpers/jwt")
const {OAuth2Client} = require("google-auth-library")


class Controller {
    static async register(req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }

            const user = await User.create(payload)

            res.status(201).json({
                id: user.id,
                email: user.email
            });

        } catch (err) {
            console.log(err, "<<<<ini register") 
            next(err)
        }
    }

    static async login(req, res, next) {
        try{
            const payload = {
                email: req.body.email,
                password: req.body.password
            }

            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })

            // console.log(user, "<<<<<<<<ini user")

            if (!user) {
				throw { name: "User not found" }

			} else if (!comparePassword(payload.password, user.password)) {
                
                console.log(comparePassword(payload.password, user.password), "<<ini compare password") 
                
                throw { name: "User Password not matced" }

			} else { 
				const access_token = signToken({
					id: user.id,
					email: user.email
                });
                console.log(access_token, "<<<ini access token dri controller")

				res.status(200).json({
					access_token
				});
			}

		} catch (err) {
            console.log(err, "<<<<error login")
			next(err);
		}

    }

    
	static googleLogin(req, res, next) {
        let {google_access_token} = req.body
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email = ''

        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            let payload = ticket.getPayload()
            console.log(payload, '>>>>>>>>')
            email = payload.email
            return User.findOne({where: {email:payload.email}})
        })
        .then(user=>{
            if(user ){

                return user
            } else {
                var userObj = {
                    email,
                    password: 'random'
                }
                return User.create(userObj)
            }
        })
        .then(dataUser => {
            let access_token = signToken.signToken({id: dataUser.id, email: dataUser.email})
            return res.status(200).json({access_token})
        })
        .catch(err => {
            console.log(err)
        })

    }


    static async showAll(req, res) {
        try {
            const userId = req.loggedInUser.id
            const task = await Task.findAll({
                where: {
                    UserId: userId
                },
               
            });

            res.status(200).json(task)
        } catch(error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    static async create(req, res) {
        
        const UserId = req.loggedInUser.id
        const { title, category, description } = req.body;
		
		try {
			const dataTask = await Task.create({ title, category, description, UserId })

			const result = {
				"id": dataTask.id,
				"title": dataTask.title,
                "category": dataTask.category,
                "description": dataTask.description,
                "UserId": dataTask.UserId
            }
            console.log(result)

			res.status(201).json(result);

		} catch (err) {
			res.status(400).json(err);
		}
	}

	static async showById(req, res) {
		try {
			const id = +req.params.id;
			const dataTask = await Task.findByPk(id)

			res.status(200).json(dataTask);

		} catch (err) {
			res.status(404).json(err);
		}
	}

	static async editTask(req, res) {
        
		try {
            const id = +req.params.id;
		    const { title, category, description } = req.body;
            
            console.log("ini body>>>>>>>", req.body)

            const dataTask = await Task.update({
				title,
                category,
                description
            }, { where: { id }, returning: true })
            
            console.log("dataTask>>>>>>>>>>",dataTask[1][0])

            res.status(200).json(dataTask[1][0])
            
		} catch (err) {

            console.log(err)

			res.status(404).json(err)
		
		}
	}


	static async delete(req, res) {
		try {
			const id = +req.params.id;
			const deletedTodo = await Task.destroy({
				where: { id }
			})

			res.status(200).json({msg: `id: ${id} success deleted`})
		} catch (err) {
            console.log(err, "<<<<<<<<<<eror control")
			res.status(500).json(err)
		}
	}


}

module.exports = Controller