//imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const societyMember = require("./server/schema/society-members");
const flatModel = require("./server/schema/flat-details");
const visitorModel = require("./server/schema/visitor-details");
const clubhouseModel = require("./server/schema/clubhouse-details");
const flatInfoUpload = require("./server/routes/flats");
const registerNewFlat = require("./server/routes/registration");
const getAllMembers = require("./server/routes/getAllMembers");
const login = require("./server/routes/login");

const app = express();
const PORT = 5001;

//connecting with mongodb compass locally
mongoose.connect('mongodb://127.0.0.1/societyManagementSystem')
    .then(()=>console.log("Connected to database successfully!"))


//middleware
app.use(bodyParser.json());
app.use(express.json());


//API from routes

//1. input flat details
app.use('/post', flatInfoUpload);

//2. register new user
app.use('/register', registerNewFlat);

//3. get list of all members
app.use('/society', getAllMembers);

//4. login
app.use('', login);


//server
app.listen(PORT, ()=>console.log(`Listening on http://localhost:${PORT}`));