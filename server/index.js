const express = require('express') //express module
const app = express(); // create an express app

const cors = require('cors'); //allows all cross-origin requests to access the resources
app.use(cors()); //useful, but configure allowed domain/origin
app.use(express.urlencoded({extended: true})); //parse incoming request bodies with URL-encoded data by the client
app.use(express.json()); // parse request bodies that are in JSON format
require('dotenv').config();

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, world!');
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});