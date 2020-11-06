const express = require('express');
const router =  express.Router();
const taskRouter = require('./task')
const authentication = require('../middlewares/authentication');

const UserController = require('../controllers/UserController');
// const QuoteController = require('../controllers/QuoteController');
router.get('/',(req,res,next) => {
    res.json({message : "Welcome to Kanban App by Diva"})
})

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/googleLogin', UserController.googleLogin);

router.use(authentication);

router.use('/tasks', taskRouter);

module.exports = router;