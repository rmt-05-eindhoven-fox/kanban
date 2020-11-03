const CategoryController = require('../controllers/CategoryController');
const OrganizationController = require('../controllers/OrganizationController');
const TaskController = require('../controllers/TaskController');
const UserController = require('../controllers/UserController');
const { authentication, authorizeOrganization, authorizeCategory, authorizeTask } = require('../middleware/auth');

const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Connection OK', status: 200 })
})


router.post('/login', UserController.login);
router.post('/register', UserController.register);

router.use(authentication)

/** 
 * Router Organizations
 */
router.get('/organizations', OrganizationController.index);
router.post('/organizations', OrganizationController.store);
router.get('/organizations/:id', authorizeOrganization, OrganizationController.show);
router.put('/organizations/:id', authorizeOrganization, OrganizationController.update);
router.delete('/organizations/:id', authorizeOrganization, OrganizationController.destroy);
router.post('/organizations/member/:id', authorizeOrganization, OrganizationController.addMember);
router.delete('/organizations/member/:id', authorizeOrganization, OrganizationController.destroyMember);

/** 
 * Router Categories
 */
router.get('/categories', CategoryController.index);
router.post('/categories', authorizeOrganization, CategoryController.store);
router.get('/categories/:id', authorizeCategory, CategoryController.show);
router.put('/categories/:id', authorizeCategory, CategoryController.update);
router.delete('/categories/:id', authorizeCategory, CategoryController.destroy);

/** 
 * Router Task
 */
router.get('/tasks', TaskController.index);
router.post('/tasks', authorizeOrganization, TaskController.store);
router.get('/tasks/:id', authorizeCategory, TaskController.show);
router.put('/tasks/:id', authorizeCategory, TaskController.update);
router.delete('/tasks/:id', authorizeCategory, TaskController.destroy);

module.exports = router;