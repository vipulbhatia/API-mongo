var express = require('express');
var router = express.Router();
Patrol = require('../model/patrol');

router.get('/', function(req,res,next){
    
    Patrol.find({},function(err,doc){
        if(err) next(err);
        else{
            res.status(200).json(doc);
        }
    });
});

router.get('/:hostname', function(req,res,next){
    
    Patrol.find({esm_name:req.params.hostname},function(err,doc){
        if(err) next(err);
        else{
            res.status(200).json(doc);
        }
    });
});

router.get('/account/:code', function(req,res,next){
    
    Patrol.find({esm_name:req.params.hostname,account:req.params.code},function(err,doc){
        if(err) next(err);
        else{   
            res.status(200).json(doc);
        }
    });
});

router.get('/source/:rsm', function(req,res,next){  
    Patrol.find({source:req.params.rsm},function(err,doc){
        if(err) next(err);
        else{   
            res.status(200).json(doc);
        }
    });
});


module.exports = router;