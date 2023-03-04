const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//schema
const usersSchema = new Schema({
        // email: {type: String, required: true},
        username: {type: String, required: true},
        password: {type: String, required: true},
    },

    {
        versionKey: false
    });


//model based on schema
const UserModel = mongoose.model('user', usersSchema);
module.exports = UserModel;