const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orderSchema = new Schema({
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true}, //objects, rather than just object ids
        products: [{type: Schema.Types.ObjectId, ref: 'Product', required: true}],
        total: {type: Number, required: true},

    },
    {
        versionKey: false,
        timestamps: true
    });
const OrderModel = mongoose.model('Order', orderSchema);
module.exports = OrderModel;