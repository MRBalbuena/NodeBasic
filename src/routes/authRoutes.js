var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function(){
    authRouter.route('/signUp')
        .post(function(req, res){
            // get user data out of body using body-;arser
            console.log(req.body);
        });
    return authRouter;
}

module.exports = router;