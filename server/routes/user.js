const express = require("express");
const router = express.Router();

const {signup, login, find} = require("../controllers/userController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/find", find);


module.exports = router;