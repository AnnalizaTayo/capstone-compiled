const mongoose = require('mongoose');
const User = require('../models/User');
const Note = require('../models/Note');

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');


// @desc Get all users
// @route GET /users
// @access Private
exports.getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();
    if(!users?.length) {
        return res.status(400).json({ message: 'No users found'});
    }
    res.json(users);
});

// @desc Create new user
// @route POST /users
// @access Private
exports.createNewUser = asyncHandler(async (req, res) => {
    try {
        const { email, username, password, role, firstName, lastName } = req.body;

        if (!email || !username || !password || !role || !firstName || !lastName) {
            return res.status(400).json({ message: 'All fields are required'});
        }
    
        // Create a new user
        const newUser = new User({
        email,
        username,
        password,
        role,
        firstName,
        lastName,
        });
    
        // Register the user with passport-local-mongoose
        await User.register(newUser, password);
    
        return res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        if (err.name === 'UserExistsError') {
        return res.status(400).json({ message: 'User with this email or username already exists.' });
        }
    
        console.error('Error registering user:', err);
        return res.status(500).json({ message: 'An error occurred while registering the user.' });
    }
});

// @desc Update a user
// @route PATCH /users
// @access Private
exports.updateUser = asyncHandler(async (req, res) => {
    const { id , email, username, password, role, firstName, lastName } = req.body
    if (!id || !username || !role || !firstName || !lastName) {
        return res.status(400).json({ message: 'All fields are required'});
    }

    const user = await User.findById(id).exec();

    if(!user) {
        return res.status(400).json({ message: 'User not found'});
    }

    const duplicateUsername = await User.findOne({username}).lean().exec()
    const duplicateEmail = await User.findOne({username}).lean().exec()

    if(duplicateUsername && duplicateUsername?._id.toString() !== id || duplicateEmail && duplicateEmail?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username | email'});
    }

    user.email = email;
    user.username = username;
    user.role = role;
    user.firstName = firstName;
    user.lastName = lastName;

    if (password) {
        user.password = await bcrypt.hash(password, 12)
    }

    const updatedUser = await user.save();

    res.json({ message: `${updatedUser.username} updated`});

});

// @desc Delete a user
// @route DELETE /users
// @access Private
exports.deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({message:'User ID Required'});
    }

    const note = await Note.findOne({ user: id}).lean().exec();
    if (note){
        return res.status(400).json({ message: 'User has assigned notes'});
    }

    const user = await User. findById(id).exec();

    if(!user){
        return res.status(400).json({ message: 'User not Found'});
    }

    const result = await user.deleteOne();

    const reply = `Username ${result.username} with ID ${result._id} deleted`;

    res.json(reply);

});

exports.loginUser = asyncHandler(async (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect('/listings');
});