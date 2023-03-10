const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
        name: {type: String, required: true},
        price: {type: Number, required: true},
        description: {type: String, required: true},
        // image: {type: String, required: true},
        // category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
        inStock: {type: Boolean, default: true},
        reviews: [{
            user: {type: Schema.Types.ObjectId, ref: 'User'},
            rating: {type: Number, required: true},
            comment: {type: String, required: true}
        }],
        rating: {type: Number, default: 0, max: 5}


    },
    {
        versionKey: false,
        timestamps: true
    });

const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel;