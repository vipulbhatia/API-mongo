var express = require('express');
var router = express.Router();
Netiq = require('../model/netiq');

router.get('/', function(req,res,next){
    
    Netiq.find({},function(err,doc){
        if(err) next(err);
        else{
            res.status(200).json(doc);
        }
    });
});

router.get('/:hostname', function(req,res,next){
    
    Netiq.find({esm_name:req.params.hostname},function(err,doc){
        if(err) next(err);
        else{
            res.status(200).json(doc);
        }
    });
});

router.get('/account/:code', function(req,res,next){
    
    Netiq.find({esm_name:req.params.hostname,account:req.params.code},function(err,doc){
        if(err) next(err);
        else{   
            res.status(200).json(doc);
        }
    });
});

router.get('/source/:rsm', function(req,res,next){  
    Netiq.find({source:req.params.rsm},function(err,doc){
        if(err) next(err);
        else{   
            res.status(200).json(doc);
        }
    });
});


module.exports = router;