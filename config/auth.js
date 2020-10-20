/*File Name: auth.js
Created by: Cong Wang
Student Number: #301098547
Created on: 10.19.2020*/

module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Please login to view this resource');
        res.redirect('/users/login');
    }
}