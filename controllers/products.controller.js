const mongoose = require("mongoose");
const ProductSchema = require("../models/product");
const Product = mongoose.model("Product", ProductSchema);

exports.createProduct = async (req, res) => {
  const { name, description, price, stock, category, image, brand, weight, dimensions } = req.body;

  const product = new Product({
    name,
    description,
    price,
    stock,
    category,
    image,
    brand,
    weight,
    dimensions
  });

  try {
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find({});
      res.send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  exports.getProductById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).send("Product not found");
      }
      res.send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  exports.getProductByCategory = async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      const products = await Product.find({ category: categoryId });
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "description", "price", "stock", "category", "image", "brand", "weight", "dimensions"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }
  
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!product) {
        return res.status(404).send("Product not found");
      }
      res.send(product);
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).send("Product not found");
      }
      res.send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  };
