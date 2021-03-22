const mongoose = require('mongoose');
const Schema = mongoose.Schema;


    
// create a geolocation schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default :"point"
    },
    coordinates: {
        type: [Number],
        index:"2dsphere"
    }
})


//create a ninja schema & model.. 
const NinjaSchema = new Schema({
name:{ 
 type: String ,
required: [true , 'name field is required.']
},
rank:{
   type: String 
   },
available:{
    type: Boolean,
    default: false
},
// add in geo-location
geometry : GeoSchema
});

const Ninja = mongoose.model('Ninja' , NinjaSchema);  // creating a collextion(model)

module.exports = Ninja;  // exporting ninjas, for being used in routes(api.js)

