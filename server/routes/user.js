const express = require("express");
const router = express.Router();
const upload = require("../Utils/upload");

const {
    signup,
    login,
    find,
    updateUser
} = require("../controllers/userController");


router.post("/signup", signup);
router.post("/login", login);
router.get("/find", find);
router.put("/update", upload.single("profileImage"), updateUser);


module.exports = router;