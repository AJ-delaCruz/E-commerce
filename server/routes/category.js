const express = require('express');
const router = express.Router();

const {addCategory, getCategories} = require('../controllers/categoryController');
const {checkAuth} = require("../Utils/passport");

router.post('/add', checkAuth, addCategory);
router.get('/get', getCategories);

module.exports = router;