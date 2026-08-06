import mongoose from "mongoose";

const flashSaleSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    discountPercent: {
      type: Number,
      required: true,
      min: 1,
      max: 99,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    quantity: {
      type: Number,
      min: 1,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const FlashSale = mongoose.model("FlashSale", flashSaleSchema);

export default FlashSale;
