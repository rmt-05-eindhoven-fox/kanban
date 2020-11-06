const router = require("express").Router()
const Controller = require('../controllers/control')
const authentication = require('../middlewares/authentication')
const authorization = require("../middlewares/authorization")



router.post("/register", Controller.register)
router.post("/login", Controller.login)

router.post("/googleLogin", Controller.googleLogin)

router.use(authentication)
router.get("/showAll", Controller.showAll)
router.post("/create", Controller.create)

router.get('/:id', authorization, Controller.showById)
router.put("/edit/:id", authorization, Controller.editTask)
router.delete("/delete/:id", authorization, Controller.delete)

module.exports=router