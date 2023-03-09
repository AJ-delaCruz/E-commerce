const express = require("express");
const router = express.Router();

const {
    signup,
    login,
    find,
    updateUser
} = require("../controllers/userController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/find", find);
router.put("/update", updateUser);


module.exports = router;