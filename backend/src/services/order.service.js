


import crypto from "crypto";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";
import { sendOrderConfirmationEmail, sendOrderDispatchedEmail } from "../utils/sendOrderEmails.js";
import { getIO } from "../socket/socket.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const reduceStock = async (product, quantity) => {
  product.stock = Math.max(0, product.stock - quantity);
  await product.save();
  getIO()?.emit("product:stock", {
    productId: String(product._id),
    stock: product.stock,
    isActive: product.isActive,
  });
};

class OrderService {
  // Buy Now — single product order, awaiting email confirmation
  async buyNow(buyerId, data) {
    const { productId, quantity, shippingAddress, contactName, contactPhone, paymentType } = data;

    const product = await Product.findById(productId);
    if (!product) throw createError("Product not found", 404);

    if (product.stock < quantity) {
      throw createError(`Only ${product.stock} item(s) left in stock`, 400);
    }

    const buyer = await User.findById(buyerId);
    if (!buyer) throw createError("User not found", 404);

    const unitPrice = product.discountPrice || product.price;
    const totalAmount = unitPrice * quantity;
    const confirmationToken = crypto.randomBytes(32).toString("hex");

    const order = await Order.create({
      buyer: buyerId,
      seller: product.seller,
      product: product._id,
      productTitle: product.title,
      productImage: product.imageUrl,
      quantity,
      unitPrice,
      totalAmount,
      shippingAddress,
      contactName,
      contactPhone,
      paymentType,
      status: "awaiting_confirmation",
      isConfirmed: false,
      confirmationToken,
    });

    // Stock is NOT reduced yet — only once the buyer confirms via email.
    await sendOrderConfirmationEmail(buyer.email, order);

    return {
      success: true,
      message: "Order created. Please check your email to confirm it.",
      order,
    };
  }

  // Checkout — every item currently in the buyer's cart
  async checkoutCart(buyerId, data) {
    const { shippingAddress, contactName, contactPhone, paymentType } = data;

    const buyer = await User.findById(buyerId);
    if (!buyer) throw createError("User not found", 404);

    const cart = await Cart.findOne({ user: buyerId }).populate("items.product");
    const cartItems = (cart?.items || []).filter((item) => item.product);

    if (cartItems.length === 0) throw createError("Your cart is empty", 400);

    for (const item of cartItems) {
      if (item.product.stock < item.quantity) {
        throw createError(
          `"${item.product.title}" only has ${item.product.stock} item(s) left in stock`,
          400
        );
      }
    }

    const orders = [];

    for (const item of cartItems) {
      const unitPrice = item.product.discountPrice || item.product.price;
      const totalAmount = unitPrice * item.quantity;
      const confirmationToken = crypto.randomBytes(32).toString("hex");

      const order = await Order.create({
        buyer: buyerId,
        seller: item.product.seller,
        product: item.product._id,
        productTitle: item.product.title,
        productImage: item.product.imageUrl,
        quantity: item.quantity,
        unitPrice,
        totalAmount,
        shippingAddress,
        contactName,
        contactPhone,
        paymentType,
        status: "awaiting_confirmation",
        isConfirmed: false,
        confirmationToken,
      });

      orders.push(order);
      await sendOrderConfirmationEmail(buyer.email, order);
    }

    cart.items = [];
    await cart.save();

    return {
      success: true,
      message: "Orders created. Please check your email to confirm them.",
      orders,
    };
  }

  // Buyer clicks the "Confirm Order" link from their email
  async confirmOrder(token) {
    const order = await Order.findOne({ confirmationToken: token });

    if (!order) throw createError("Invalid or expired confirmation link", 404);
    if (order.isConfirmed) throw createError("This order has already been confirmed", 400);

    const product = await Product.findById(order.product);
    if (product) {
      if (product.stock < order.quantity) {
        throw createError(`Sorry, "${product.title}" no longer has enough stock`, 400);
      }
      await reduceStock(product, order.quantity);
    }

    order.isConfirmed = true;
    order.status = "pending";
    order.confirmedAt = new Date();
    await order.save();

    const io = getIO();
    if (io) {
      io.to(`seller:${order.seller}`).emit("new-order", {
        orderId: order._id,
        productTitle: order.productTitle,
        productImage: order.productImage,
        quantity: order.quantity,
        totalAmount: order.totalAmount,
        contactName: order.contactName,
        contactPhone: order.contactPhone,
        shippingAddress: order.shippingAddress,
        createdAt: order.createdAt,
      });
    }

    return {
      success: true,
      message: "Order confirmed successfully! The seller has been notified.",
      order,
    };
  }

  // Seller marks a confirmed order as dispatched
  async dispatchOrder(sellerId, orderId) {
    const order = await Order.findOne({ _id: orderId, seller: sellerId });

    if (!order) throw createError("Order not found", 404);
    if (!order.isConfirmed) throw createError("This order hasn't been confirmed by the buyer yet", 400);
    if (order.status === "shipped" || order.status === "delivered") {
      throw createError("This order has already been dispatched", 400);
    }

    order.status = "shipped";
    order.dispatchedAt = new Date();
    await order.save();

    const buyer = await User.findById(order.buyer);
    if (buyer) {
      await sendOrderDispatchedEmail(buyer.email, order);
    }

    return {
      success: true,
      message: "Order marked as dispatched",
      order,
    };
  }

  // Seller marks a dispatched (shipped) order as delivered
  async deliverOrder(sellerId, orderId) {
    const order = await Order.findOne({ _id: orderId, seller: sellerId });

    if (!order) throw createError("Order not found", 404);
    if (order.status === "delivered") {
      throw createError("This order has already been marked as delivered", 400);
    }
    if (order.status !== "shipped") {
      throw createError("This order must be dispatched before it can be marked as delivered", 400);
    }

    order.status = "delivered";
    order.deliveredAt = new Date();
    await order.save();

    return {
      success: true,
      message: "Order marked as delivered",
      order,
    };
  }

  async getSellerOrders(sellerId) {
    const orders = await Order.find({ seller: sellerId, isConfirmed: true })
      .populate("buyer", "firstName lastName email phone")
      .sort({ createdAt: -1 });

    return { success: true, orders };
  }

  async getBuyerOrders(buyerId) {
    const orders = await Order.find({ buyer: buyerId }).sort({ createdAt: -1 });
    return { success: true, orders };
  }

  async getOrderById(buyerId, orderId) {
    const order = await Order.findOne({ _id: orderId, buyer: buyerId });
    if (!order) throw createError("Order not found", 404);
    return { success: true, order };
  }
}

export default new OrderService();
