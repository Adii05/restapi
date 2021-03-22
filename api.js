const express = require('express');
const Ninja = require('../models/ninjas');
const router = express.Router();   // requiring the router.

//get a list of ninjas from the dbs..
router.get('/ninjas', function(req , res , next){
//res.send({type: 'GET'});
Ninja.aggregate().near({
    near:{
        'type':'point',
        'coordinates': 
        [parseFloat(req.query.lng),  // url params . by default querystrings coming are of string typ , parsefloat converts it to no
        parseFloat(req.query.lat)]   // ''
    },
        maxDistance : 100000,
        spherical: true,
        distanceField: "dis"
    
}).then(function(ninjas){
    res.send(ninjas);
});
});
// add a new ninja to the db.
router.post('/ninjas', function(req , res , next){
    Ninja.create(req.body).then(function(ninja){     // promise
        res.send(ninja);
    }).catch(next);
    
    });
// update / edit a ninja in the db.
router.put('/ninjas/:id', function(req , res , next){
    Ninja.findByIdAndUpdate({_id : req.params.id}, req.body).then(function(ninja){
        res.send(ninja);
    });
    res.send({type: 'PUT'});
    });
// deleting a ninja from a db.
router.delete('/ninjas/:id', function(req , res , next){
   Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
    Ninja.findOne({_id: req.params.id}).then(function(ninja){
        res.send(ninja);
    })
    
   });
    
    });

//exporting the router
module.exports = router;
