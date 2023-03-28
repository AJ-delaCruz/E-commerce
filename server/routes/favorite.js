const express = require('express');
const router = express.Router();

const {addFavorite, removeFavorite, getFavorite} = require('../controllers/favoriteController');

router.post('/', addFavorite);
router.delete('/:productId/:userId', removeFavorite);
router.get('/:productId/:userId', getFavorite);



module.exports = router;