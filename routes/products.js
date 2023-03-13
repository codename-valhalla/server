const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/products.controller');

// Create a new product
router.post('/', ProductController.createProduct);

// Get all products
router.get('/', ProductController.getAllProducts);

// Get a specific product
router.get('/:id', ProductController.getProductById);

// Get product by category
router.get("/category/:categoryId", ProductController.getProductByCategory);

// Update a specific product
router.put('/:id', ProductController.updateProduct);

// Delete a specific product
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
