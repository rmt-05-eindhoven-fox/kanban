const router = require("express").router();
const UserController = require("../controllers/UserController");
const TaskController = require("../controllers/TaskController");
const CategoryController = require("../controllers/CategoryController");

// landing
router.get('/', UserController.landingpage)
//register
router.post("/register", UserController.register);
//login
router.post("/login", UserController.login);

//task CRUD
//CREATE
router.post("/tasks/:CategoryId",  TaskController.add);
//READ
router.get("/tasks", TaskController.show);

router.get("/tasks/:id", TaskController.find);
//UPDATE
router.put("/tasks/:id",  TaskController.edit);
//DELETE
router.delete("/tasks/:id",TaskController.delete);

