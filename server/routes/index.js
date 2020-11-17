const router = require("express").Router();
const UserController = require("../controllers/UserController");
const TaskController = require("../controllers/TaskController");
const CategoryController = require("../controllers/CategoryController");
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

//register
router.post("/register", UserController.register);
//login
router.post("/login", UserController.login);

//task CRUD endpoint
//CREATE
router.post("/tasks/:CategoryId", authentication,  TaskController.add);
//READ
router.get("/tasks",authentication, TaskController.show);

router.get("/tasks/:id", authentication, authorization, TaskController.find);
//UPDATE
router.put("/tasks/:id", authentication, authorization, TaskController.edit);
//DELETE
router.delete("/tasks/:id", authentication, authorization, TaskController.delete);

router.patch("/tasks/:id", authentication, authorization, TaskController.move);

//ENDPOINTS CATEGORY
router.post("/categories", authentication, CategoryController.addCategory);

module.exports = router;