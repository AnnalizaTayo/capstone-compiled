const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const validRoles = ['admin', 'moderator'];

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
        validator: function (value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Email format validation
        },
        message: 'Invalid email format',
        },
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        validate: {
        validator: function (value) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value); // Password format validation
        },
        message: 'Password should contain at least one uppercase letter and a combination of alphanumeric or special characters',
        },
    },
    role: {
        type: String,
        enum: validRoles,
        default: 'moderator',
        validate: {
        validator: function (value) {
            return validRoles.includes(value); // Role validation
        },
        message: `Invalid role. Role should be one of: ${validRoles.join(', ')}`,
        },
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    accountCreationDate: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema, 'users');
