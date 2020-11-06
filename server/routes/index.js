const router = require('express').Router();
const routerUser = require('../routes/user');
const routerCat = require('../routes/category');
const routerTask = require('../routes/task');

router.use(routerUser);
router.use('/category', routerCat);
router.use('/task', routerTask);

module.exports = router;