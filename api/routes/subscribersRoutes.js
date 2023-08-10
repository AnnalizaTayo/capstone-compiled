const express = require('express');
const router = express.Router();
const subscribersController = require('../controllers/subcribersController');

router.route('/')
    .post(subscribersController.subscribe)
    //.delete(subscribersController.deleteUser)
    //.get(subscribersController.getAllUsers)

module.exports = router;