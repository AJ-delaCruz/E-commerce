const Category = require("../Models/CategoryModel");
const addCategory = async (req, res) => {
    const { name, description } = req.body;

    // check if user is an admin
    if (req.user.userType !== 'admin') {
        return res.status(401).json({ message: 'You are not authorized to perform this action.' });
    }

    try {

        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(409).json({ message: 'Category already exists.' });
        }

        // Create new category
        const category = new Category({ name, description });
        const savedCategory = await category.save();

        res.status(201).json({ message: 'Category created successfully.', category: savedCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating category.' });
    }
};

// get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        console.log(categories);

        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting categories.' });
    }
};

module.exports = {
    addCategory,
    getCategories
}