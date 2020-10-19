var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//User model
const User = require('../Models/Users');


/*GET login ejs*/
router.get('/login', (req,res)=>{
  res.render('login.ejs', {data:{
      "title": "Log in"
    }});
})

/*GET register ejs*/
router.get('/register', (req,res)=>{
  res.render('register.ejs', {data:{
      "title":"register"
    }})
})

/*POST user register data*/
router.post('/register', (req,res)=>{
  const { username, password, email } = req.body;
  let errors = [];

  //password should be more than 6
  if(password.length < 6){
    errors.push({
      msg: 'Password should be at least 6 characters'
    })
  }

  if(errors.length > 0){
    //has error
    res.render('register', {
      data: {
      'title': 'register'
            },
      errors,
      username,
      password,
      email
    })
  }else{
    //validation pass
    //check whether email exists
    User.findOne({
      email:email
    })
        .then(user => {
          if(user){
            //user exists
            errors.push({
              msg:'Email already exists.'
            })
            res.render('register', {
              data: {
                'title': 'register'
              },
              errors,
              username,
              password,
              email
            })
          }else{
            //user does not exist,store user
            const newUser = new User({
              username,
              password,
              email
            });

            //hash password
            bcrypt.genSalt(10, (error, salt) =>
                bcrypt.hash(newUser.password, salt, (error, hash) => {
                  if(error) {
                    throw error;
                  }

                  //set password to hashed
                  newUser.password=hash;

                  //save user to db
                  newUser.save()
                      .then(user => {
                        req.flash('success_msg', 'You are now registered and can login');
                        res.redirect('/users/login');
                      })
                      .catch(error => console.log(error));
            }))
          }
        })
  }

})

/*POST user login data*/
router.post('/login', (req,res, next)=>{
  //whether the user exists
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
})

/*GET user logout*/
router.get('/logout', (req,res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
})

module.exports = router;
