


import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      min: 0,
      default: null,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },

    // Multiple product images (up to 4). imageUrl is kept for backward
    // compatibility with existing products that only have one image.
    images: {
      type: [String],
      default: [],
    },

    // Brand name (optional)
    brand: {
      type: String,
      trim: true,
      default: "",
    },

    // Available colors — seller can add multiple e.g. ["Red", "Blue", "Black"]
    colors: {
      type: [String],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;