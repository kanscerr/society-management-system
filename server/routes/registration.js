const express = require('express');
const router = express.Router();
const modelMember = require('../schema/society-members');
const modelFlats = require('../schema/flat-details');

//generate password
const generatePassword = () => {
    const length = 10; //desired length of the password
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'; //characters to include in the password
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }

    return password;
};

//get flat detail
router.post('/getFlatDetail', (req, res) => {
    if(req.body.wing && req.body.floor){
        modelFlats.find({'wing' : req.body.wing, 'floor' : req.body.floor, 'isVacant' : 'true'}).exec()
        .then((data) => {
            if(Object.keys(data).length === 0){
                res.json("flat does not exist!");
            }
            else{
                res.json(data.sort());
            }
        })
    }
    else{
        res.json("Fill all fields!")
    }
})

//register new flat
router.post('/newFlat', (req, res) => {
    // Check if all fields are present
    if (req.body.name && req.body.email && req.body.contact && req.body.role && req.body.wing && req.body.floor && req.body.flat) {
        // Searching to see if the entered flat is vacant
        modelFlats.findOne({ 'wing': req.body.wing, 'floor': req.body.floor, 'flatNo': req.body.flat }).exec()
            .then((data) => {
                if (data.isVacant === true) {
                    const clientId = req.body.name.slice(0, 3) + req.body.flat + req.body.floor + req.body.wing;
                    const clientDetail = {
                        'id': clientId,
                        'name': req.body.name,
                        'email': req.body.email,
                        'contact': req.body.contact,
                        'role': req.body.role,
                        'isClubhouseMember': false
                    };
                    const flatDetail = {
                        'wing': req.body.wing,
                        'floor': req.body.floor,
                        'flat': req.body.flat,
                        'isOnRent': req.body.isOnRent
                    };
                    const detail = {
                        memberDetail: clientDetail,
                        addressDetail: flatDetail,
                        password: generatePassword() //system generated
                    };
                    modelMember.create(detail);
                    // Updating flat's isVacant to false
                    modelFlats.findOneAndUpdate({ 'floor': req.body.floor, 'flatNo': req.body.flat },
                        { $set: { 'isVacant': false, 'owner': req.body.name, 'contact': req.body.contact } },
                        { new: true } //returns the modified document
                    )
                        .then((data) => res.send(data))
                        .catch((err) => res.send("Some error occurred!"));
                } else {
                    res.json("Flat already booked!");
                }
            })
            .catch((err) => res.json("Some error occurred!"));
    } else {
        res.json("Fill all fields!");
    }
});

module.exports = router;