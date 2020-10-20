/*File Name: User.js
Created by: Cong Wang
Student Number: #301098547
Created on: 10.19.2020*/

const mongoose = require('mongoose');

//structure of document
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;