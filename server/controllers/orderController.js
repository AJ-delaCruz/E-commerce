const {Order} = require('./models');
const {Cart} = require('./models');


// Place a new order based on user's cart
const placeOrder = async (req, res) => {
    try {
        // Get the user ID from the request body
        const userId = req.body.userId;

        // Find the user's cart in the database
        const cart = await Cart.findOne({user: userId});

        // Make sure the cart is not empty
        if (!cart) {
            return res.status(400).json({message: 'The cart is empty'});
        }

        // Create a new order based on the cart contents
        const order = new Order({
            user: userId,
            products: cart.items.map(item => item.product),
            total: cart.totalPrice,
        });

        // Save the new order to the database
        const savedOrder = await order.save();

        // Clear the user's cart in the database
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        // Return the new order in the response
        res.status(201).json(savedOrder);
    } catch (err) {
        // Handle any errors that occur
        res.status(500).json({message: 'Failed to place order', error: err});
    }
};


//view order details
const getOrder = async (req, res) => {

    const orderId = req.params.orderId;

    try {
        // get a single order to display user info and products in the order
        const order = await Order.findById(orderId).populate('user').populate('products.product');//display the products

        // no orders
        if (!order) {
            return res.status(400).json({message: 'No orders'});
        }

        res.status(200).json(order);
        console.log("one get order successful")

    } catch (err) {
        res.status(500).json(err);
    }
}

//get all orders
const getAllOrders = async (req, res) => {


    //display the order number, date, total price, and name of user
    try {
        const userId = req.query.userId;
        // Find the user's orders in the database
        const orders = await Order.find({user: userId}).populate('user', 'firstName lastName');

        // no orders
        if (!orders) {
            return res.status(400).json({message: 'No orders'});
        }

        res.status(200).json(orders);
        console.log("get all orders successful")

    } catch (err) {
        res.status(500).json(err);
    }
};

//cancel order, change shipping, etc
const updateOrder = async (req, res) => {

}

module.exports = {
    placeOrder,
    getOrder,
    getAllOrders

}

