/*File Name: passport.js passport config
Created by: Cong Wang
Student Number: #301098547
Created on: 10.19.2020*/


const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//load user model
const User = require('../Models/Users');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({
            usernameField: 'username'
        }, (username, password, done) => {
            //match user
            User.findOne({ username:username })
                .then(user => {
                    if(!user){
                        return done(null, false, { message: 'username or password incorrect' });
                    }

                    //match the password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err){
                            throw err;
                        }
                        if(isMatch){
                            return done(null, user);
                        }else{
                            return done(null, false, { message: 'username or password incorrect' })
                        }
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}