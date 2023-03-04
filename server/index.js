const express = require('express') //express module
const app = express(); // create an express app

const cors = require('cors'); //allows all cross-origin requests to access the resources
app.use(cors()); //useful, but configure allowed domain/origin
app.use(express.urlencoded({extended: true})); //parse incoming request bodies with URL-encoded data by the client
app.use(express.json()); // parse request bodies that are in JSON format
require('dotenv').config();

const port = 3000;

//connect to mongoDB
const { mongoDB } = require('./Utils/config'); //dotenv.config();
const mongoose = require('mongoose');

mongoose.connect(mongoDB ,(err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

const userRoute = require("./routes/user");

app.use("/user", userRoute);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});