const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
        name: {type: String, required: true},
        price: {type: Number, required: true},
        description: {type: String, required: true},
        // image: {type: String, required: true},
        // category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},


    },
    {
        versionKey: false,
        timestamps: true
    });

const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel;