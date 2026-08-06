import FlashSale from "../models/flashSale.model.js";
import Product from "../models/product.model.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class FlashSaleService {
  // =========================
  // Create a new flash sale (seller only, must own the product)
  // =========================
  async createFlashSale(sellerId, saleData) {
    const { product, discountPercent, startDate, endDate, quantity } = saleData;

    // Verify the product belongs to this seller
    const productDoc = await Product.findOne({ _id: product, seller: sellerId, deletedAt: null });
    if (!productDoc) {
      throw createError("Product not found or does not belong to you", 404);
    }

    // Validate date range
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) {
      throw createError("End date must be after start date", 400);
    }

    const sale = await FlashSale.create({
      seller: sellerId,
      product,
      discountPercent,
      startDate: start,
      endDate: end,
      quantity: quantity || null,
    });

    // Populate product info before returning
    await sale.populate("product", "title imageUrl price");

    return {
      success: true,
      message: "Flash sale created successfully",
      sale,
    };
  }

  // =========================
  // Get all flash sales for the logged-in seller
  // =========================
  async getMyFlashSales(sellerId) {
    const sales = await FlashSale.find({ seller: sellerId })
      .populate("product", "title imageUrl price")
      .sort({ createdAt: -1 });

    return { success: true, sales };
  }

  // =========================
  // Get currently active flash sales (public)
  // =========================
  async getActiveFlashSales() {
    const now = new Date();
    const sales = await FlashSale.find({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
    })
      .populate("product", "title imageUrl price stock")
      .populate("seller", "storeProfile.storeName")
      .sort({ endDate: 1 });

    return { success: true, sales };
  }

  // =========================
  // Update a flash sale (only its own seller)
  // =========================
  async updateFlashSale(sellerId, saleId, saleData) {
    const sale = await FlashSale.findOne({ _id: saleId, seller: sellerId });

    if (!sale) {
      throw createError("Flash sale not found", 404);
    }

    const { product, discountPercent, startDate, endDate, quantity, isActive } = saleData;

    if (product !== undefined) {
      // Verify ownership of the new product
      const productDoc = await Product.findOne({ _id: product, seller: sellerId, deletedAt: null });
      if (!productDoc) {
        throw createError("Product not found or does not belong to you", 404);
      }
      sale.product = product;
    }
    if (discountPercent !== undefined) sale.discountPercent = discountPercent;
    if (startDate !== undefined) sale.startDate = new Date(startDate);
    if (endDate !== undefined) sale.endDate = new Date(endDate);
    if (quantity !== undefined) sale.quantity = quantity;
    if (isActive !== undefined) sale.isActive = isActive;

    // Re-validate date range
    if (sale.endDate <= sale.startDate) {
      throw createError("End date must be after start date", 400);
    }

    await sale.save();
    await sale.populate("product", "title imageUrl price");

    return {
      success: true,
      message: "Flash sale updated successfully",
      sale,
    };
  }

  // =========================
  // Delete a flash sale (only its own seller)
  // =========================
  async deleteFlashSale(sellerId, saleId) {
    const sale = await FlashSale.findOneAndDelete({ _id: saleId, seller: sellerId });

    if (!sale) {
      throw createError("Flash sale not found", 404);
    }

    return {
      success: true,
      message: "Flash sale deleted successfully",
    };
  }
}

export default new FlashSaleService();
