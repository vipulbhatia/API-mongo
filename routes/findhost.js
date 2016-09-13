var express = require('express');
var router = express.Router();
Findhost = require('../model/findhost');


router.get('/', (req,res,next)=>
    Findhost.find({},function(err,doc){
        if(err) throw(err);
        else{
            res.status(200).json(doc);
        }
    })
);

router.get('/:hostname', function(req,res,next){
    var host = req.params.hostname;
    Findhost.find({esm_name:host},function(err,doc){
        if (err) next(err);
        else{
            res.status(200).json(doc);
        }
    });
});

router.get('/account/:accountCode', function(req,res,next){
    var acc = req.params.accountCode;
    Findhost.find({account:acc},function(err,doc){
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
    Findhost.find({account:acc,cost:level},function(err,doc){
        if (err) next(err);
        else{
            res.status(200).json(doc);
        }
    });
});

module.exports = router;