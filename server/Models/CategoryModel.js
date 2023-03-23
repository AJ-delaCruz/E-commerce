const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
        name: {type: String, required: true},
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const CategoryModel = mongoose.model('Category', categorySchema);
module.exports = CategoryModel;
