const express = require("express");
const router = express.Router();

const {placeOrder, getOrder, getAllOrders} = require("../controllers/orderController");

router.post("/placeOrder", placeOrder);
router.post("/getOrder", getOrder);
router.post("/getAllOrders", getAllOrders);


module.exports = router;
