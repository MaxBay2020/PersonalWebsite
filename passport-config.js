var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

function initialize(passport, getUserByUsername){
    var authenticateUser = async (username, password, done) => {
        var user = getUserByUsername(username);

        if(user==null){
            return done(null, false, {message: 'No user with that username'})
        }

        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user);

            }else{
                return done(null, false, {message: 'Username or Password not correct'})
            }
        }catch (e){
            return done(e);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
    passport.serializeUser((user, done) => {});
    passport.deserializeUser((id, done) => {});

};

module.exports = initialize;