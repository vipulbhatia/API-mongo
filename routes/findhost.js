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

router.get('/:hostname/:limit?/:_id?', function(req,res,next){
    var host = new RegExp(req.params.hostname, 'i');
    var query = {};
    var limit = 10;
    console.log(req.params);
    if(req.params.limit != undefined && req.params.limit < 20) limit = parseInt(req.params.limit);
    if(req.params._id) {
        query = {
            esm_name: host,
            _id: {
                $gt: req.params._id
            }
        };
    } else {
        query = {
            esm_name: host
        };
    }
    Findhost.find(query)
        .limit(limit)
        .exec(function(err,doc){
        if (err) next(err);
        else {
            res.status(200).json({results: doc});
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
