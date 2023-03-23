const Cart = require("../Models/CartModel");
const Product = require("../Models/ProductModel");

// adding products to cart
const addProduct = async (req, res) => {
    const {userId, productId, quantity} = req.body;

    console.log(req.user.userType);

    try {
        // look for an existing cart
        let cart = await Cart.findOne({user: userId});


        // Create a new cart if user doesn't have data in cart
        if (!cart) {
            cart = new Cart({
                user: userId, products: [], totalPrice: 0
            });
        }

        //  use current cart if it exists
        const existingProduct = cart.products.find(item => item.products.toString() === productId); //change object type to string to compare

        // If the product is already in the cart, update the quantity
        if (existingProduct) {
            existingProduct.quantity += quantity;
            existingProduct.price = existingProduct.product.price * existingProduct.quantity;
        } else {
            // Otherwise, add the new product to the cart
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(400).json({message: 'Invalid product ID'});
            }

            const newItem = {
                product: product._id, quantity: quantity, price: product.price * quantity
            };

            cart.items.push(newItem);  //add the new product to the cart
        }

        //update cart total price
        cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);

        // Save cart to the database
        const savedCart = await cart.save();

        // Return new cart response
        res.status(201).json(savedCart);
    } catch (err) {

        res.status(500).json({message: 'Cart err'});
    }
};

//remove product from cart
const deleteProduct = async (req, res) => {
    const {userId, productId} = req.body;

    try {
        // find the user's cart
        const cart = await Cart.findOne({user: userId});

        // check if cart exists
        if (!cart) {
            return res.status(404).json({message: 'Cart not found'});
        }
        // remove the product from the cart
        cart.products = cart.products.filter(item => item.product.toString() !== productId); //change object type to string to compare

        // update cart total price
        cart.totalPrice = cart.products.reduce((total, item) => total + item.price, 0); //object total + item.price (without product being removes)

        // save the updated cart to the database
        const updatedCart = await cart.save();

        // return the updated cart
        res.status(200).json(updatedCart);


    } catch (err) {
        res.status(500).json({message: 'Removing product from cart failed'});
    }


};


//change the quantity of the item
const updateCart = async (req, res) => {
    const {userId, productId, quantity} = req.body;

    try {
        //find cart for user
        const cart = await Cart.findOne({user: userId});

        if (!cart) {
            res.status(404).json("no cart found")
        }

        // remove the product from the cart
        cart.products = cart.products.filter(item => item.product.toString() !== productId); //change object type to string to compare


        //find the product in cart using product id
        const cartItem = cart.products.find(item => item.product.toString === productId);
        // check if product exists in cart
        if (!cartItem) {
            return res.status(404).json({message: 'Product not found in cart'});
        }

        //update the product quantity
        cartItem.quantity = quantity;
        //update the product price
        cartItem.price = cartItem.product.price * quantity;


        // update cart total price
        cart.totalPrice = cart.products.reduce((total, item) => total + item.price, 0); //object total + item.price

        // save the updated cart to the database
        const updatedCart = await cart.save();

        // return the updated cart
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json({message: 'Failed to add/remove product from cart'});
    }


};

const getCart = async (req, res) => {
    const userId = req.query.userId;

    try {
        //find cart for user
        const cart = await Cart.findOne({user: userId});

        if (!cart) {
            res.status(404).json("no cart found")
        }
        //return cart
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({message: "Error getting cart"});
    }

};

module.exports = {addProduct, deleteProduct, updateCart, getCart}
