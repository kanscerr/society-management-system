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
                const flatDetails = new model({
                    "flatNo" : j,
                    "floor" : i,
                    "wing" : 'A',
                    "owner" : 'Akash Kamble',
                    "contact" : '9528674880',
                    "isVacant" : true
                })
                model.create(flatDetails);//new way to save data in db
            }
        }
        for(let i=1;i<6;i++){
            for(let j=1;j<21;j++){
                const flatDetails = new model({
                    "flatNo" : j,
                    "floor" : i,
                    "wing" : 'B',
                    "owner" : 'Akash Kamble',
                    "contact" : '9528674880',
                    "isVacant" : true
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



