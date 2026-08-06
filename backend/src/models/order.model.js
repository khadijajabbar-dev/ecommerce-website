




import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

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

    productTitle: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      default: "",
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    shippingAddress: {
      type: String,
      required: true,
    },

    contactName: {
      type: String,
      required: true,
    },

    contactPhone: {
      type: String,
      required: true,
    },

    paymentType: {
      type: String,
      enum: ["cod", "card", "easypaisa", "jazzcash"],
      default: "cod",
    },

    status: {
      type: String,
      enum: ["awaiting_confirmation", "pending", "processing", "shipped", "delivered", "cancelled"],
      default: "awaiting_confirmation",
    },

    isConfirmed: {
      type: Boolean,
      default: false,
    },

    confirmationToken: {
      type: String,
    },

    confirmedAt: {
      type: Date,
    },

    dispatchedAt: {
      type: Date,
    },

    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;