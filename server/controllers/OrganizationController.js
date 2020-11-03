const { Organization, OrganizationUser } = require("../models/")

class OrganizationController {

    static async readOrg(req, res, next) {
        try {
            const UserId = req.isSignedIn.id
            const result = await OrganizationUser.findAll({
                where: {
                    UserId
                },
                include: [Organization]
            })
            res.status(200).json({result})
        } catch (err) {
            next(err)
        }
    }

    static async createOrg(req, res, next) {
        const { org_name, org_code } = req.body
        const UserId = req.isSignedIn.id

        try {
            const result = await Organization.create({
                org_name,
                org_code
            })
            const data = await OrganizationUser.create({
                UserId,
                OrganizationId: result.id
            })
            res.status(201).json({result})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = OrganizationController