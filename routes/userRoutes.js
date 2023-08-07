const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');
const passport = require('passport');

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser);

/* router.post('/register', usersController.createNewUser);

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),usersController.loginUser);
 */
module.exports = router;