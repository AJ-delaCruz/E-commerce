const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//schema
const usersSchema = new Schema({
        // email: {type: String, required: true},
        username: {type: String, required: true},
        password: {type: String, required: true},
        userType: { type: String, enum: ['customer', 'admin'], default: 'admin' }

    },

    {
        versionKey: false
    });


//user model based on schema
const UserModel = mongoose.model('User', usersSchema);
module.exports = UserModel;