var passport = require('passport');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user); // null -> error
    });

    passport.deserializeUser(function (user, done) {
        // mongo.findbyid if recieve userId
        done(null, user); // null -> error
    });

    require('./strategies/local.strategy')();
};
