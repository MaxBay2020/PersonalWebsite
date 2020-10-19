/*File Name: index.js
Created by: Cong Wang
Student Number: #301098547
Created on: 10.2.2020*/

var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport');
var flash = require('express-flash');
var session = require('express-session');
var {ensureAuthenticated} = require('../config/auth');

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
  res.render('Home_Page.ejs', { data:{
      "title": "Welcome to Cong's Place",
      "comment":"hello visitor",
      "hello":["Hello", "こんにちは", "안녕하십니까", "Bonjour", "Hola a todos", "你好"],
      "status":["Unity3D Programmer","a B/S and C/S Developer","a New Things Follower"],
      "projects":["Unity3D Games", "B/S Applications", "C/S applications"]
    }
  });
})

/* GET about_me page*/
router.get('/aboutme',function (req,res,next) {
  res.render('About_Me.ejs', {data: {
      "title":"About Me",
      "aboutMeTitles": ["Hi, it is nice to see you here!", "Game Programmer", "B/S App Developer", "C/S App Developer"],
      "things": ["Unity3D", "Java","NodeJs","Database"],
      "offers":["Unity3D Programmer", "Front-end", "Back-end", "Testing"],
      "games":["Runaway Boy", "Space Invader", "Breakout", "Battle City", "Angry Bird", "Snake", "Fishing Joy"],
      "bsApp":["User Management System using JavaEE and MySQL", "Travel Website using JavaEE, MySQL and Redis", "User Management system using NodeJs, Express","Forum website using NodeJs, Express, Mongoose"],
      "csApp":["Student Management System using DataGridView and MySQL", "Music Player", "Calculator", "BMI Calculator using DataGridView", "multi-player Plane Shooting Game using Socket"],
    }
  })
})

/* GET projects_unity page*/
router.get('/projectsUnity', function (req, res, next) {
  res.render('projectsUnity.ejs', {data:{
      "title": "Unity3D Projects",
      "things": ["Unity3D", "Java","NodeJs","Database"]

    }
  })
})

/* GET projects_web pages*/
router.get('/projectsWeb', function (req, res, next) {
  res.render('projectsWeb.ejs', {data:{
      "title": "Web Projects",
      "things": ["Unity3D", "Java","NodeJs","Database"]
    }

  })
})

/* GET projects_net pages*/
router.get('/projectsNet', function(req,res,next){
  res.render('projectsNet', {data:{
      "title":".Net Projects",
      "things": ["Unity3D", "Java","NodeJs","Database"]
    }

  })
})

/* GET services page*/
router.get('/services',function (req,res,next) {
  res.render('services.ejs', {data:{
      "title": "Services",
      "things": ["Unity3D", "Java","NodeJs","Database"],
      "offers":["Unity3D Programmer", "Front-end", "Back-end", "Testing"],
    }

  })
})


/* GET contact_me page*/
router.get('/contactme', function (req, res, next) {
  res.render('contact.ejs', {data: {
      "title": "Conact Me"
    }
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

/* GET ask for content */
router.get('/content', function (req, res, next) {
    res.render('content.ejs', {data: {
            "title":"About Me",
            "things": ["Unity3D", "Java","NodeJs","Database"],
            "offers":["Unity3D Programmer", "Front-end", "Back-end", "Testing"],
            "games":["Runaway Boy", "Space Invader", "Breakout", "Battle City", "Angry Bird", "Snake", "Fishing Joy"],
        }
    })
})

/*contacts view page*/
router.get('/contacts', ensureAuthenticated, (req,res) => {
    res.render('contacts', {
        data: { 'title': 'Contacts' },
        username: req.user.username
    });
})


module.exports = router;
