/*File Name: index.js
Created by: Cong Wang
Student Number: #301098547
Created on: 10.2.2020*/

var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash = require('express-flash');
var session = require('express-session');
var {ensureAuthenticated} = require('../config/auth');
const fs = require('fs');
const Contacts = require('../config/contacts');

//email helper
var nodemailer  = require('nodemailer');

//email sender config
var mailTransport = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secureConnection:true,
    auth:{
        user: "443021341@qq.com",
        pass: "13ULovEi14962464"
    }
});

//local database
var users=[];


/* GET home page. */
router.get("/", function (req,res,next) {
  res.render('Home_Page.ejs', {
      title: "Welcome",
      comment:"hello visitor",
      hello:["Hello", "こんにちは", "안녕하십니까", "Bonjour", "Hola a todos", "你好"],
      status:["Unity3D Programmer","a B/S and C/S Developer","a New Things Follower"],
      projects:["Unity3D Games", "B/S Applications", "C/S applications"],
      layout: false
  });
})

/* GET about_me page*/
router.get('/aboutme',function (req,res,next) {
  res.render('About_Me', {
      title:"About Me",
      layout: './layouts/layout1'
  })
})

/* GET projects_unity page*/
router.get('/projectsUnity', function (req, res, next) {
  res.render('projectsUnity.ejs', {
      title: "Unity3D Projects",
      layout: './layouts/layout1'
  })
})

/* GET projects_web pages*/
router.get('/projectsWeb', function (req, res, next) {
  res.render('projectsWeb.ejs', {
      title: "Web Projects",
      layout: './layouts/layout1'
  })
})

/* GET projects_net pages*/
router.get('/projectsNet', function(req,res,next){
  res.render('projectsNet', {
      title:".Net Projects",
      layout: './layouts/layout1'
  })
})

/* GET services page*/
router.get('/services',function (req,res,next) {
  res.render('services.ejs', {
      title: "Services",
      layout: './layouts/layout1'
  })
})


/* GET contact_me page*/
router.get('/contactme', function (req, res, next) {
  res.render('contact', {
      title: "Contact Me",
      layout: './layouts/layout2'
  })
})

/* GET submit form info to home page */
router.post('/send', function (req, res, next) {
  // res.render('Home_Page.ejs', {
  //   "title": "Welcome to Cong's Place",
  //   "comment":res.body
  // });
    var name = req.body.firstName + ' '+req.body.lastName;
    var phone = req.body.phone;
    var email = req.body.email;
    var comment = req.body.comment;

    //send an email to my email
    var options1 = {
        from        : '"My Personal Website" <443021341@qq.com>',
        to          : '"hotmail1" <cwang167@my.centennialcollege.ca>, "hotmail2" <wangxiaobei666@hotmail.com>',
        // cc         : ''  //抄送
        // bcc      : ''    //密送
        subject        : 'An email from my website',
        // text          : 'An email from my website',
        html           : '<h1>Hello! I got an email from my website！</h1><p>' +
                            '<p>From: '+req.body.firstName +' '+ req.body.lastName+'</p>' +
                            '<p>Phone number is : '+req.body.phone+'</p>' +
                            '<p>Email is : '+req.body.email+'</p>' +
                            '<p>Comment is : '+req.body.comment+'</p>',
    };

    mailTransport.sendMail(options1, function(err, msg){
        if(err){
            console.log(err);
            res.render('index', { title: err });
        }
        else {
            console.log(msg);
            res.render('index', { title: "Received："+msg.accepted});
        }
    });

    //send email to visiters;
    //send an email to my email
    var options2 = {
        from        : '"Hello from Cong Wang" <443021341@qq.com>',
        to          : '"email" <'+req.body.email+'>',
        // cc         : ''  //抄送
        // bcc      : ''    //密送
        subject        : 'An email from Cong Wang',
        // text          : 'An email from my website',
        html           : '<h1>Hello! </h1><p>This is Cong Wang. I have got your email and I will reply very soon.</p><p>Have a nice day!</p>'
    };

    mailTransport.sendMail(options2, function(err, msg){
        if(err){
            console.log(err);
            res.render('index', { title: err });
        }
        else {
            console.log(msg);
            res.render('index', { title: "Received："+msg.accepted});
        }
    });

    //redirect to home page
    res.redirect('/');

})

/*GET contacts view page*/
router.get('/contacts', ensureAuthenticated, (req,res) => {
    //call find method
    Contacts.find(function (err, contacts) {
        if(err){
            return res.status(500).send('Server Error!');
        }

        res.render('contacts', {
            title: 'Contacts',
            username: req.user.username,
            contacts: contacts,
            layout: './layouts/layout2'
        });
    })

})

/*GET add contact*/
router.get('/contacts/new',ensureAuthenticated, (req, res) => {
    res.render('new', {
        title: 'Add',
        username:req.user.username,
        layout: './layouts/layout2'
    });
})

/*POST add contact*/
router.post('/contacts/new', (req,res) => {
    //call add method
    Contacts.add(req.body, function (err) {
        if(err){
            return res.status(500).send('Server Error!');
        }

        //redirect to /contacts
        res.redirect('/contacts');
    })
})

/*GET modify info*/
router.get('/contacts/modify', ensureAuthenticated, (req,res)=>{
    //find one contact based on id
    Contacts.findOneById(req.query.id, function (err, contact) {
        if(err){
            return res.status(500).send('Server Error!');
        }

        // render modify ejs, show contact info
        res.render('modify', {
            title: 'Modify',
            username:req.user.username,
            contact:contact,
            layout: './layouts/layout2'
        })
    })

})

/*POST modify info*/
router.post('/contacts/modify', (req,res) => {
    Contacts.updateById(req.body, function (err) {
        if(err){
            return res.status(500).send('Server Error!');
        }

        res.redirect('/contacts');
    })

})

/*GET delete contact*/
router.get('/contacts/delete', (req,res)=>{
    Contacts.deleteById(req.query.id, function (err) {
        if(err){
            return res.status(500).send('Server Error!');
        }
        res.redirect('/contacts');
    })
})

module.exports = router;
