var passport = require('passport');

var passportFunction = function(app){
    app.use(passport.initialize());
    app.use(passport.session());  

    passport.serializeUser(function(user, done){
        done(null, user); // null -> error
    });

    passport.deserializeUser(function(userId, done){
        // mongo.findbyid
        done(null, user); // null -> error
    });
    
    require('./srategies/local.strategy')();
}

module.exports = passportFunction;