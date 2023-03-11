const Category = require("../Models/CategoryModel");
const addCategory = async (req, res) => {
    const { name, description } = req.body;

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

module.exports = {
    addCategory
}