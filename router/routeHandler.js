

const express = require('express');
const router = express.Router();
const routeController = require('../controller/routeController');
const {authUser, checkUser} = require('../middleware/authUser');

router.get('/index', routeController.index_get);
router.get('/sign-up', routeController.signup_get);
router.get('/login', routeController.login_get);
router.get('/calculator', authUser, routeController.calculator);
router.get('/logout', routeController.logout);
router.post('/sign-up', routeController.signup_post);
router.post('/login', routeController.login_post);


module.exports = router;
