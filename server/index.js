require('dotenv').config();
const express = require('express') //express module
const app = express(); // create an express app

const cors = require('cors'); //allows all cross-origin requests to access the resources
app.use(cors()); //useful, but configure allowed domain/origin
// app.use(cors({origin: process.env.frontendURL, credentials: true}));

app.use(express.urlencoded({extended: true})); //parse incoming request bodies with URL-encoded data by the client
app.use(express.json()); // parse request bodies that are in JSON format

const path = require("path");
// make "uploads" directory as a static directory so it can be accessed by client
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// console.log(__dirname)
const fs = require('fs');

// create the uploads directory if it doesn't exist
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

const port = 3000;

//connect to mongoDB
const { mongoDB } = require('./Utils/config'); //dotenv.config();
const mongoose = require('mongoose');


//
// mongoose.connect(mongoDB ,(err, res) => {
//     if (err) {
//         console.log(err);
//         console.log(`MongoDB Connection Failed`);
//     } else {
//         console.log(`MongoDB Connected`);
//     }
// });

//Connection pooling to improve the performance and scalability
// reuse connection to db
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10, // max connections in the pool
};

mongoose.connect(mongoDB, options, (err) => {
    if (err) {
        console.log(err);
        console.log('MongoDB Connection Failed');
    } else {
        console.log('MongoDB Connected');
    }
});

const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/orders");
const cartRoute = require("./routes/cart");
const categoryRoute = require("./routes/category");



app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/cart", cartRoute);
app.use("/category", categoryRoute);



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});