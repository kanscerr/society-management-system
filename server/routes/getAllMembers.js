const express = require('express');
const router = express.Router();
const modelMember = require('../schema/society-members');
const { model } = require('mongoose');

//list all members
router.post('/getAllMembers', (req, res) => {
    if(req.body.role === 'Admin'){
        const members = [];
        let obj = {};
        modelMember.find().exec()
        .then((data) => {
            const extractedData = data.map(obj => {
                return {
                memberDetail: obj.memberDetail,
                addressDetail: obj.addressDetail
                };
            });
        
            res.json(extractedData);
        })
        .catch((err) => res.json("Some error occured!"));
    }
    else{
        res.json("You do not have permission to carry out this task.")
    }
})

//get detailed view of a resident
router.post('/memberInfo', (req, res) => {
    if(req.body.role === "Admin" && req.body.id){
        modelMember.findOne({'memberDetail.id' : req.body.id}).exec()
        .then((data) => {
            const filteredData = {memberDetail : data.memberDetail, addressDetail : data.addressDetail};
            res.json(filteredData);
        })
    }
})

module.exports = router;