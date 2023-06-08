const express = require('express');
const router = express.Router();
const modelMember = require('../schema/society-members');

//test if password is strong
function isStrong(pwd) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!.?!@#$%^&*]{8,15}$/;
    const isStrongPassword = passwordRegex.test(pwd);
    return isStrongPassword;
}


//login
router.post('/login', (req, res) => {
    if(req.body.id && req.body.password){
        modelMember.findOne({'memberDetail.id' : req.body.id, 'password' : req.body.password}).exec()
        .then((data) => {
            if(data === null){
                res.json("Invalid credentials");
            }
            else{
                res.json(data);
            }
        })
    }
    else{
        res.json("Fill all fields!")
    }
})


//prompt to change password
router.post('/changePassword', (req, res) => {
    if(req.body.id && req.body.oldPwd && req.body.newPwd && req.body.newPwdConfirm && req.body.newPwd == req.body.newPwdConfirm){
        if(isStrong(req.body.newPwd)){
            modelMember.findOneAndUpdate({'memberDetail.id' : req.body.id, 'password' : req.body.oldPwd},
                {$set : {'password' : req.body.newPwd}},
                { new: true } //returns the modified document
            )
            .then((data) => res.json(data))
            .catch((err) => res.json("Oops! Some error occured."))
        }
        else{
            res.json("New password is not strong enough!")
        }
    }
    else if(req.body.newPwd != req.body.newPwdConfirm){
        res.json("Error: The new password and confirmation password do not match.")
    }
})

module.exports = router;