const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { loginToken } = require("../helpers/jwt");

class userController{
    static async register(request, response, next) {
        console.log(request.body)
        try {
            const payload = {
                name: request.body.name,
                email: request.body.email,
                password: request.body.password
            }
            const user = await User.create(payload);
            response.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email
            });
        } catch (error) {
            next(error);
        }
    }

    static async login(request, response, next) {
        try {
            const payload = {
                email: request.body.email,
                password: request.body.password
            }
            console.log(payload.email);
            console.log(payload.password);
            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            });
            if(!user) {
                throw { name: 'InvalidEmailPassword'}
            }else if(!comparePassword(payload.password, user.password)) {
                throw { name: 'InvalidEmailPassword'}
            }else {
                const access_token = loginToken({
                    id: user.id,
                    email: user.email
                });
                response.status(200).json({ access_token });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = userController;