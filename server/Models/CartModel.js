const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        items: [{
            product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
            quantity: {type: Number, required: true, default: 1},
            price: {type: Number, required: true}, //price at the time of purchase
        }]
    },

    {
        versionKey: false,
        timestamps: true

    });

const CartModel = mongoose.model('Cart', cartSchema);
module.exports = CartModel;

