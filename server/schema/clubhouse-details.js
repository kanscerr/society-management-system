//---CLUBHOUSE DETAILS---

//imports
const mongoose = require('mongoose');

//schema
const clubhouseSchema = new mongoose.Schema({
    club : String,
    joinDate : Date,
    fee : Number
})

//creating model
const clubhouseModel = mongoose.model("clubhouse members", clubhouseSchema);

//export
module.exports = clubhouseModel;