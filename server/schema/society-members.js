//--SOCIETY MEMBER SCHEMA--

//imports
const mongoose = require('mongoose');

//schema
const personalDetail = new mongoose.Schema({
    id : String,
    name : String,
    email : String,
    contact : String,
    role : String,
    designation : String,
    isClubhouseMember : Boolean
})

const addressDetail = new mongoose.Schema({
    flat : String,
    floor : Number,
    wing : String,
    isOnRent : Boolean
})

const clubhouseMembership = new mongoose.Schema({
    club : String,
    joinDate : Date
})

const paymentDetail  = new mongoose.Schema({
    lastDate : Date,
    totalBill : Number,
    NetPayableAmount : Number,
    isPaymentDone : Boolean
})

const memberInfo = new mongoose.Schema({
    memberDetail : personalDetail,
    addressDetail : addressDetail,
    clubhouseMembership : [clubhouseMembership],
    paymentDetail : [paymentDetail],
    password : String
})

//creating model
const societyMemberModel = mongoose.model('society members', memberInfo);

//exporting
module.exports = societyMemberModel;