//---FLATS DETAIL---

//imports
const mongoose = require('mongoose');

//schema
const flatDetails = new mongoose.Schema({
    flatNo : Number,
    floor : Number,
    wing : String,
    owner : String,
    contact : String,
    isVacant : Boolean,
    price : Number
})

//creating model
const flatModel = mongoose.model("flat detail", flatDetails);

//export
module.exports = flatModel;