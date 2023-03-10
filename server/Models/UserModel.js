const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//schema
const usersSchema = new Schema({
        // email: {type: String, required: true},
        username: {type: String, required: true},
        password: {type: String, required: true},
        userType: {type: String, enum: ['customer', 'admin'], default: 'admin'},

        firstName: {type: String},
        lastName: {type: String},
        address: {
            street: {type: String},
            city: {type: String},
            state: {type: String},
            zipCode: {type: String}
        },
        phoneNumber: {type: String},
        profilePicture: {type: String},

    },

    {timestamps: true}
);


//user model based on schema
const UserModel = mongoose.model('User', usersSchema);
module.exports = UserModel;