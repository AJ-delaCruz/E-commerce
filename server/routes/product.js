const express = require("express");
const router = express.Router();

const {addProduct} = require("../controllers/productController");
const {checkAuth} = require("../Utils/passport");

router.post("/add", checkAuth, addProduct);



module.exports = router;