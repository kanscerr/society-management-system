//---VISITOR DETAIL---

//import
const mongoose = require('mongoose');

//schema
const visitorSchema = new mongoose.Schema({
    name : String,
    contact : String,
    visitingToFlat : String,
    entryTime : Date,
    existTime : Date
});

//creating model
const visitorModel = mongoose.model("visitors list", visitorSchema);

//export
module.exports = visitorModel;