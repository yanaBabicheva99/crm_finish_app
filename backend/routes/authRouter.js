const express = require('express');
const controller = require('../controllers/authController');
const tokenController = require('../controllers/tokenController');
const passport = require("passport");
const router = express.Router();

//localhost:5000/api/auth/login
router.post('/login', controller.login);
//localhost:5000/api/auth/register
router.post('/register', controller.register);
router.get('/token/refresh', tokenController.refresh);
router.post('/logout', controller.logout);

router.get('/get', passport.authenticate('jwt', {session: false}), controller.getUser);
router.patch('/update', passport.authenticate('jwt', {session: false}), controller.updateUser);
router.put('/change', passport.authenticate('jwt', {session: false}), controller.changeUser)

module.exports = router;