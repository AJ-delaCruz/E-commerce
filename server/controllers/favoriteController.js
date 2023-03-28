const FavoriteModel = require('../Models/FavoriteModel');

const addFavorite = async (req, res) => {
    try {
        const favorite = await FavoriteModel.findOne({
            user: req.body.userId,
            product: req.body.productId,
        });

        console.log(favorite);
        if (favorite) {
            res.status(200).json({message: "Favorite already exists"});
        } else {
            const addFavorite = new FavoriteModel({
                user: req.body.userId,
                product: req.body.productId,
            });
            await addFavorite.save();
            res.status(201).json({message: "Favorite added successfully"});
        }


    } catch (err) {
        res.status(500).json({message: "Error adding to Favorite"});
    }

};
const removeFavorite = async (req, res) => {
    try {
        const favorite = await FavoriteModel.findOneAndDelete({
            user: req.params.userId,
            product: req.params.productId,
        });

        if (favorite) {
            res.status(200).json({message: "Favorite deleted successfully"});
        } else {
            res.status(404).json({error: "Favorite not found"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Error adding to Favorite"});

    }
};


const getFavorite = async (req, res) => {
    console.log(req.params.userId);
    try {
        const favorite = await FavoriteModel.findOne({
            user: req.params.userId,
            product: req.params.productId,
        });
        console.log(favorite);

        if (favorite) {
            res.status(200).json({isFavorite: true});
        } else {
            res.status(200).json({isFavorite: false});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Server error"});
    }

};


module.exports = {
    addFavorite,
    removeFavorite,
    getFavorite
}