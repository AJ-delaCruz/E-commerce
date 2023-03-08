const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: {type: Number, required: true, default: 1},
});

const cartSchema = new Schema({
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        items: [cartItemSchema],
        dateCreated: {type: Date, default: Date.now},
        dateUpdated: {type: Date},
        totalPrice: {type: Number, required: true, default: 0},
    },
    {timestamps: true}
);

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
