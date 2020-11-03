const CategoryController = require('../controllers/CategoryController');
const OrganizationController = require('../controllers/OrganizationController');
const UserController = require('../controllers/UserController');
const { authentication, authorizeOrganization } = require('../middleware/auth');

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
// router.get('/categories', CategoryController.index);
// router.post('/categories', CategoryController.store);
// router.get('/categories/:id', authorizeOrganization, CategoryController.show);
// router.put('/categories/:id', authorizeOrganization, CategoryController.update);
// router.delete('/categories/:id', authorizeOrganization, CategoryController.destroy);


module.exports = router;