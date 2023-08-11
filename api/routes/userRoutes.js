const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');
const passport = require('passport');

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser);


router.post('/login', passport.authenticate('local'), usersController.loginUser);
router.post('/logout', usersController.logoutUser);
router.post('/:userId', usersController.getOneUserById);

module.exports = router;