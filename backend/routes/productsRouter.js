const express = require('express');
const controller = require('../controllers/productsController');
const passport = require('passport');
const router = express.Router();



router.get('/', passport.authenticate('jwt', {session: false}), controller.getUserProducts);
router.get('/get/:id', passport.authenticate('jwt', {session: false}), controller.getUserProduct);
router.patch('/remove/:id', passport.authenticate('jwt', {session: false}), controller.removeUserProducts);

router.post('/', passport.authenticate('jwt', {session: false}), controller.createUserProducts);
router.patch('/update/:id', passport.authenticate('jwt', {session: false}), controller.updateUserProducts);
router.put('/change/:id', passport.authenticate('jwt', {session: false}), controller.changeUserProducts);


module.exports = router;