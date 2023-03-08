const Product = require("../Models/ProductModel");

addProduct = async (req, res) => {
    console.log(req.user.userType);
    // check if user is an admin
    if (req.user.userType !== 'admin') {
        return res.status(401).json({ message: 'You are not authorized to perform this action.' });
    }



    // create a new product with data from the request body
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        // image: req.body.image,

    });

    // save the new product to the database
    newProduct.save((err, product) => {
        if (err) {
            return res.status(400).json({ message: 'Error creating product.', error: err });
        }
        res.status(201).json({ message: 'Product created successfully.', product });
    });
};

module.exports = {
    addProduct
};