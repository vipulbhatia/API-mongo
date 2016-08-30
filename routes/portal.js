var express = require('express');
var router = express.Router();
Portal = require('../model/portal');

router.get('/', function(req,res,next){
    
    Portal.find({},function(err,doc){
        if(err) next(err);
        else{
            res.status(200).json(doc);
        }
    });
});

router.get('/:hostname', function(req,res,next){
    
    Portal.find({esm_name:req.params.hostname},function(err,doc){
        if(err) next(err);
        else{
            res.status(200).json(doc);
        }
    });
});

router.get('/account/:code', function(req,res,next){
    
    Portal.find({esm_name:req.params.hostname,account:req.params.code},function(err,doc){
        if(err) next(err);
        else{   
            res.status(200).json(doc);
        }
    });
});

router.get('/portal/:mlm', function(req,res,next){  
    Portal.find({source:req.params.mlm},function(err,doc){
        if(err) next(err);
        else{   
            res.status(200).json(doc);
        }
    });
});


module.exports = router;