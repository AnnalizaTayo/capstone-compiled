const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

exports.getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();
    if(!users?.length) {
        return res.status(400).json({ message: 'No users found'});
    }
    res.json(users);
});

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

exports.deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({message:'User ID Required'});
    }

    const user = await User.findById(id).exec();

    if(!user){
        return res.status(400).json({ message: 'User not Found'});
    }

    const result = await user.deleteOne();

    const reply = `Username ${result.username} with ID ${result._id} deleted`;

    res.json(reply);

});

exports.loginUser = (req, res) => {
    
    const user = req.user;
    const { rememberMe } = req.body;

    // Set token expiration times based on Remember Me checkbox
    const accessTokenExpiration = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000;
    const refreshTokenExpiration = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: accessTokenExpiration,
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: refreshTokenExpiration,
    });

    const userWithoutPassword = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    };

    // Set HTTP-only cookies
    res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: accessTokenExpiration });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: refreshTokenExpiration });

    console.log(userWithoutPassword);
    res.json({ message: 'Logged in successfully', user: userWithoutPassword, accessToken, refreshToken });
}

exports.logoutUser = (req, res) => {
    res.cookie('accessToken', '', { expires: new Date(0), httpOnly: true });
    res.cookie('refreshToken', '', { expires: new Date(0), httpOnly: true });
    res.status(200).json({ message: 'Logout successful' });
}