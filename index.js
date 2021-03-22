//requiring express & routes 

const express =  require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');

//setting up express app
const app = express();
//connect to mongodb.
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise; // since mongoose'S promise is depricated.

//using middleware for static files(htn,css, img )
app.use(express.static('public'));

// using middleware before route-handlers
app.use(bodyParser.json);
//making our app to know, to allow using routes.(initailze routes )
app.use('/api' , routes);

//errorhandling middleware
app.use(function(err , req, res , next){
    res.status(422).send({error:err.message});
});


//listen for requests
app.listen(process.env.port|| 4001 , function(){
    console.log("listening for requests");
});