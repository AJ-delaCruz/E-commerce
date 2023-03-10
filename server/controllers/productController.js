const Product = require("../Models/ProductModel");

//create a product
const addProduct = async (req, res) => {
    console.log(req.user.userType);

    // check if user is an admin
    if (req.user.userType !== 'admin') {
        return res.status(401).json({ message: 'You are not authorized to perform this action.' });
    }

    try {
        // create a new product with data from the request body
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image,
        });

        // save the new product to the database
        const savedProduct = await newProduct.save();

        res.status(201).json({ message: 'Product created successfully.', product: savedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating product.' });
    }
};

//get product details
const getProductDetails = async (req, res) => {
    const productId = req.params.productId;

    try {
        //find product using productId
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({message: "product not found"});
        }

        res.status(200).json(product);

    } catch (err) {
        res.status(500).json({message: "Error getting product details"})

    }

}

//retrieve all products with filter, sorting, and search functionalites
const getProducts = async (req, res) => {
    try {

        //filter or sort based on query
        const {category, minPrice, maxPrice, sortBy, search, page, limit} = req.query;
        // Set default values for pagination
        const currentPage = parseInt(page, 10) || 1; //radix = 10 as decimal to avoid errors
        const perPage = parseInt(limit, 10) || 10; //max products shown per page

        //filter object using category, minPrice, maxPrice
        let filter = {};

        // If category is provided, add it to the filter object
        if (category) {
            filter.category = category;
        }

        // If minPrice or maxPrice is provided, add it to filter object
        if (minPrice || maxPrice) {
            filter.price = {};
            // add to filter object as a greater-than or equal-to
            if (minPrice) {
                filter.price.$gte = minPrice;
            }
            // add to filter object as a less-than or equal-to
            if (maxPrice) {
                filter.price.$lte = maxPrice;
            }
        }

        //sorting using sortBy query
        const sort = {};

        // sort products by price in descending order
        if (sortBy === "desc") {
            sort.price = 1;
        }
        // sort products by price in ascending order
        else if (sortBy === "asc") {
            sort.price = -1;
        }
        // sort products by createdAt date in descending order
        else if (sortBy === "new") {
            sort.createdAt = -1;
        }

        // Set up search query
        const regex = new RegExp(search, 'i'); //make search case-insensitive
        const searchQuery = search ? {
            $or: [{name: regex}, {description: regex}] //sub-query searches for name or description of product
        } : {}; //else return empty for filter

        // Get total number of products for pagination
        const count = await Product.countDocuments({...filter, ...searchQuery});

        // Find products based on filter, sort, and search criteria
        const products = await Product.find({...filter, ...searchQuery})
            .sort(sort)
            .skip((currentPage - 1) * perPage) //skip the products that were shown on previous page
            .limit(perPage); // number of products per page

        // If no products are found, return a 404 response
        if (!products) {
            return res.status(404).json({message: "No products found"});
        }

        // Return the found products
        res.status(200).json({
            products,
            currentPage,
            pages: Math.ceil(count / perPage), //pages link/ round to nearest whole number
            total: count, //total products based on query
        });
    } catch (err) {

        console.error(err);
        res.status(500).json({message: "Error getting products"});
    }
};

//update product
const updateProduct = async (req, res) => {
    // check if user is an admin
    if (req.user.userType !== 'admin') {
        return res.status(401).json({message: 'You are not authorized to perform this action.'});
    }

    const productId = req.query.productId;
    const updatedDate = {...req.body};

    try {


        // Update only the specified fields
        const updatedProduct = await Product.findByIdAndUpdate({_id: productId}, {$set: updatedDate}, {
            new: true,
            runValidators: true
        });
        if (!updatedProduct) {
            res.status(404).json({message: "product not found"});
        }
        res.status(200).json(updatedProduct);


    } catch (err) {
        res.status(500).json({message: "Error updating product details"})

    }

}


//remove product
const removeProduct = async (req, res) => {
    const productId = req.body.productId;

    console.log(req.user.userType);
    // check if user is an admin
    if (req.user.userType !== 'admin') {
        return res.status(401).json({message: 'You are not authorized to perform this action.'});
    }

    try {
        //remove product
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            res.status(404).json({message: "product not found"});
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({message: "Error getting product details"})

    }


};


module.exports = {
    addProduct,
    getProductDetails,
    getProducts,
    updateProduct,
    removeProduct,


};