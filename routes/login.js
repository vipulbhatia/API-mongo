var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('./config');
Users = require('../model/login');


router.post('/', (req,res,next)=> {
    Users.find({email: req.body.email, password: req.body.password},function(err,doc){
        if(err) {
		console.log(err);
		res.status(400);
	} else if(doc.length < 1) {
        res.status(400).json({error: "incorrect username or password"});
    } else if(doc[0].status != 'active') {
        res.status(400).json({error: "user is not active, please contact administrator for your account"});
    } else {
	    console.log(doc[0]);
        console.log(doc[0].nsp);
	    var token = jwt.sign({username: doc[0].username, nsp: doc[0].nsp}, config.secret);
        res.status(200).json({token: token, username: doc[0].username, nsp: doc[0].nsp});
        }
    })
});

router.get('/getNsps', function(req,res,next){
    Users.distinct('nsp',function(err,doc){
        if (err) next(err);
        else{
            res.header('Access-Control-Allow-Origin', '*');
            res.status(200).json({results: doc});
        }
    });
});

router.get('/account/:accountCode', function(req,res,next){
    var acc = req.params.accountCode;
    Users.find({account:acc},function(err,doc){
        if (err) next(err);
        else{
            res.status(200).json(doc);
        }
    });
});

//level
router.get('/account/:accountCode/:level', function(req,res,next){
    var acc = req.params.accountCode;
    var level = req.params.level;
    Users.find({account:acc,cost:level},function(err,doc){
        if (err) next(err);
        else{
            res.status(200).json(doc);
        }
    });
});

module.exports = router;
