const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const UserController = require('../controllers/user-controller')
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require("../middlewares/auth-middleware.js");
const roleMiddleware = require("../middlewares/check-role-middleware.js");


router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 32 }),
  userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.loguot);
router.get('/activate/:link', userController.activate);
router.get('refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router;