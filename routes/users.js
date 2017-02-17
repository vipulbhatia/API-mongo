var express = require('express'),
    router = express.Router(),
    users = require('../model/users');

router.get('/:nsp', (req, res, next) => {
    if(req.params.nsp == 'admin') {
        users.find({}, (err, doc) => {
            if(err) next(err);
            else res.status(200).json({results: doc});
        });
    } else {
        users.find({nsp: req.params.nsp}, (err, doc) => {
            if(err) next(err);
            else res.status(200).json({results: doc});
        });
    }
});

router.post('/update', (req, res, next) => {
    console.log(req.body.status);
    users.findOneAndUpdate({username: req.body.username}, {role: req.body.role, status: req.body.status}, {}, (err, doc) => {
        console.log(doc);
        if(err) next(err);
        else res.status(200).json({results: 'user ' + req.body.username + ' successfully update'});

    });
});

router.post('/checkEmail', (req, res, next) => {
    console.log('checking email...');
    users.find({email: req.body.email}, (err, doc) => {
        if(err) next(err);
        if(doc.length < 1) res.status(200).json({result: 'email not found...'});
        else res.status(400).json({error: 'email already exists...'});
    });
});

router.post('/register', (req, res, next) => {
    var newUser = {};
    console.log(req.body.registerModel);
    newUser.email = req.body.registerModel.newemail.value;
    newUser.username = req.body.registerModel.newemail.value.split('@')[0];
    newUser.password = req.body.registerModel.newpassword.value;
    newUser.nsp = 'htn';
    newUser.role = 'user';
    newUser.status = 'pending';
    var nu = new users(newUser);
    nu.save((err) => {
        if(err) next(err);
        else res.status(200).json({results: 'user ' + req.body.username + ' successfully registered'});
    });
});

module.exports = router;
