const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = require("./review");

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },  
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },  
  brand: {
    type: String,
    required: true
  },  
  weight: {
    type: String
  },
  dimensions: {
    type: String
  },    
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  reviews: [ReviewSchema],
  image: {
    type: String,
  }
});

module.exports = ProductSchema;