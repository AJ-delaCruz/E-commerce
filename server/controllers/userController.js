const User = require("../Models/UserModel");

const signup = async (req, res) => {
    const {username, password} = req.body;

    try {
        const newUser = new User({
            username,
            password
        });

        const userTaken = await User.findOne({username});
        if (userTaken) {
            res.status(409).send({message: "Username already exists"});
        } else {
            const data = await newUser.save(); //register new user to mongoDB
            console.log("sign up works");
            res.status(200).send(data);  //debugging

        }

    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const login = async (req, res) =>  {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username});
        if (!user) {
            res.status(404).json({message: "Invalid Credentials. Wrong username or password"});
            console.log("wrong username");
            return;
        }

        if (password !== user.password) {
            res.status(404).json({message: "Invalid Credentials. Wrong username or password"});
            console.log("wrong password");
            console.log(password);
            console.log(user.password)
            return;
        }
        console.log("login successful")

        res.status(200).json({message: "Login successful"})
    } catch (error) {
        res.status(500).send({message: error.message});
    }

}

module.exports = {
    signup,
    login
};