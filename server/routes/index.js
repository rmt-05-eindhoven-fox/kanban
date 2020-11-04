const router = require("express").Router();

const UserController = require("../controllers/user");
const authentication = require("../middlewares/authentication");
// const authorization = require("../middlewares/authorization");

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use(authentication);

module.exports = router;
