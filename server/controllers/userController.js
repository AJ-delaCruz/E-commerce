const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {secretKey} = require("../Utils/config");


const signup = async (req, res) => {
    try {
        console.log("Inside SiGN UP POST");
        const {username, password} = req.body;

        //random string added to the password before hashed
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            password: passwordHash,
        });

        console.log(req.body.username);
        console.log(req.body.password);

        const userTaken = await User.findOne({username});
        if (userTaken) {
            //conflict
            res.status(409).send({message: "Username already exists"});
        } else {
            const data = await newUser.save(); //register new user to mongoDB
            console.log("sign up works");
            res.status(200).send(data);  //debugging

            // // Generate a JWT token for 2FA using email for verification
            // const payload = { _id: data._id, username: data.username };
            // const token = jwt.sign(payload, secretKey, {
            //     expiresIn: 1008000
            // });
            // res.status(200).json({ token });
        }
    } catch (error) {
        console.log(error);
        console.log("ERROR SIGNING UP");
        //internal server error
        res.status(500).send({message: error.message});
    }
};


const login = async (req, res) => {
    console.log("INSIDE LOGIN");

    const {username, password} = req.body;

    console.log(req.body.username);
    console.log(req.body.password);

    try {
        const user = await User.findOne({username});

        if (!user) {
            //not found
            res.status(404).json({message: "Invalid Credentials. Wrong username or password"});
            console.log("wrong username");
            return;
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            res.status(400).json({message: "Invalid credentials"});
            return;
        }

        console.log("SUCCESSFUL LOGIN");
        //jwt
        const payload = {_id: user._id, username: user.username, userType: user.userType};
        const token = jwt.sign(payload, secretKey, {
            expiresIn: 1008000,
        });

        res.status(200).json({token});
    } catch (error) {
        console.log("LOGIN NOT WORKING");
        res.status(500).json({message: error});
    }
};

//fetching user
const find = async (req, res) => {

    // console.log("INSIDE USER FIND");
    const userId = req.query.userId;
    // console.log(userId)
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
        console.log("SUCCESS GET USER")

    } catch (err) {
        console.log("ERROR GET USER");
        res.status(500).json(err);
    }
}


module.exports = {
    signup,
    login,
    find
};