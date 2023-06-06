const express = require('express');
const router = express.Router();
const modelMember = require('../schema/society-members');

//test if password is strong
function isStrong(pwd) {
    const alphabetRegex = /^[a-zA-Z]+$/;
    const numRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%?&*,.<>|(){}[\]]/;
    const hasAlphabet = alphabetRegex.test(pwd);
    const hasNumber = numRegex.test(pwd);
    const hasSpecialChar = specialCharRegex.test(pwd);
    return hasAlphabet && hasNumber && hasSpecialChar;
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
        res.send(isStrong(req.body.newPwdConfirm));
    }
    else if(req.body.newPwd != req.body.newPwdConfirm){
        res.json("Error: The new password and confirmation password do not match.")
    }
})

module.exports = router;