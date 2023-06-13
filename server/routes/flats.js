const express = require('express');
const router = express.Router();
const model = require('../schema/flat-details');

//inputting flat details
router.post('/newFlat', (req, res) => {
    const data = model.findOne({'flatNo' : req.body.flatNo}).exec()
    // res.send(data);
    if(Object.keys(data).length === 0){
        for(let i=1;i<6;i++){
            for(let j=1;j<21;j++){
                let price;
                if(i===1){
                    price = 230000;
                }
                else if(i===2){
                    price = 370000;
                }
                else if(i===3){
                    price = 420000;
                }
                else if(i===4){
                    price = 580000;
                }
                else if(i===5){
                    price = 710000;
                }
                const flatDetails = new model({
                    "flatNo" : j,
                    "floor" : i,
                    "wing" : 'A',
                    "owner" : 'Akash Kamble',
                    "contact" : '9528674880',
                    "isVacant" : true,
                    "price" : price
                })              
                model.create(flatDetails); 
            }
        }
        for(let i=1;i<6;i++){
            for(let j=1;j<21;j++){
                let price;
                if(i===1){
                    price = 230000;
                }
                else if(i===2){
                    price = 370000;
                }
                else if(i===3){
                    price = 450000;
                }
                else if(i===4){
                    price = 630000;
                }
                else if(i===5){
                    price = 780000;
                }
                const flatDetails = new model({
                    "flatNo" : j,
                    "floor" : i,
                    "wing" : 'B',
                    "owner" : 'Akash Kamble',
                    "contact" : '9528674880',
                    "isVacant" : true,
                    "price" : price
                })              
                model.create(flatDetails); 
            }
        }
        res.send("all done!")
    }
    else{
        res.send("flat already exist!")
    }
})

module.exports = router;