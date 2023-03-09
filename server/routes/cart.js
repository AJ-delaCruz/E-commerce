const express = require ("express");
const router = express.Router();

const {addProduct, deleteProduct, updateCart, getCart} = require("../controllers/cartController");

router.post("/add", addProduct);
router.delete("/remove", deleteProduct);
router.put("/update", updateCart);
router.get("/getCart", getCart);

module.exports = router;