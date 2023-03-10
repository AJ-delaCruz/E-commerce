const express = require("express");
const router = express.Router();

const {checkAuth} = require("../Utils/passport");
const upload = require("../Utils/upload");

const {
    addProduct,
    getProductDetails,
    getProducts,
    updateProduct,
    removeProduct,

} = require("../controllers/productController");

router.post("/add", upload.single("productImage"), checkAuth, addProduct);
router.get('/:id', getProductDetails);
router.get('/getAll', getProducts);
router.put("/update", upload.single("productImage"), updateProduct);
router.delete('/remove', removeProduct);



module.exports = router;