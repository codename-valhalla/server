const mongoose = require("mongoose");
const CategorySchema = require("../models/category");
const Category = mongoose.model("Category", CategorySchema);

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Get a single category
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send('Category not found');
    return res.json(category);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    return res.status(201).send('Category created successfully');
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Update an existing category
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).send('Category not found');
    return res.send('Category updated successfully');
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);
    if (!category) return res.status(404).send('Category not found');
    return res.send('Category deleted successfully');
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
