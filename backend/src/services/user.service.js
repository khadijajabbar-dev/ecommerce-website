import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class UserService {
  async getMe(userId) {
    const user = await User.findById(userId).select("-password -otp -otpExpiry");
    if (!user) throw createError("User not found", 404);
    return { success: true, user };
  }

  // Update personal profile (email and role stay immutable)
  async updateProfile(userId, profileData) {
    const user = await User.findById(userId);
    if (!user) throw createError("User not found", 404);

    const { firstName, lastName, phone, address, city, profileImage } = profileData;
    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.address = address;
    user.city = city;
    if (profileImage !== undefined) user.profileImage = profileImage || "";

    await user.save();

    return {
      success: true,
      message: "Profile updated successfully",
      user: await User.findById(userId).select("-password -otp -otpExpiry"),
    };
  }

  async setupStoreProfile(userId, storeData) {
    const {
      storeName, storeDescription, storeCategory,
      businessType, storeAddress, storeCity, ntnNumber,
    } = storeData;

    const user = await User.findById(userId);
    if (!user) throw createError("User not found", 404);
    if (user.role !== "seller") throw createError("Only sellers can set up a store profile", 403);
    if (!storeName || !storeCategory || !businessType || !storeAddress || !storeCity) {
      throw createError("Please fill in all required store details", 400);
    }

    user.storeProfile = {
      storeName,
      storeDescription: storeDescription || "",
      storeCategory,
      businessType,
      storeAddress,
      storeCity,
      ntnNumber: ntnNumber || "",
      storeLogo: user.storeProfile?.storeLogo || "",
    };
    user.isStoreSetup = true;
    await user.save();

    return {
      success: true,
      message: "Store profile saved successfully",
      user: await User.findById(userId).select("-password -otp -otpExpiry"),
    };
  }

  async deleteAccount(userId) {
    const user = await User.findById(userId);
    if (!user) throw createError("User not found", 404);

    if (user.role === "seller") {
      await Product.deleteMany({ seller: userId });
    }

    await User.findByIdAndDelete(userId);

    return { success: true, message: "Account deleted successfully" };
  }

  // ===== CART (now backed by the normalized Cart collection) =====
  async getCart(userId) {
    let cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }
    const items = cart.items.filter((item) => item.product);
    return { success: true, cart: items };
  }

  async addToCart(userId, productId, quantity = 1) {
    const product = await Product.findById(productId);
    if (!product) throw createError("Product not found", 404);

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    return this.getCart(userId);
  }

  async updateCartQuantity(userId, productId, quantity) {
    if (quantity < 1) throw createError("Quantity must be at least 1", 400);

    const cart = await Cart.findOne({ user: userId });
    const item = cart?.items.find((item) => item.product.toString() === productId);
    if (!item) throw createError("Item not found in cart", 404);

    item.quantity = quantity;
    await cart.save();
    return this.getCart(userId);
  }

  async removeFromCart(userId, productId) {
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
      cart.items = cart.items.filter((item) => item.product.toString() !== productId);
      await cart.save();
    }
    return this.getCart(userId);
  }

  // ===== WISHLIST =====
  async getWishlist(userId) {
    const user = await User.findById(userId).populate("wishlist");
    if (!user) throw createError("User not found", 404);
    const wishlist = user.wishlist.filter(Boolean);
    return { success: true, wishlist };
  }

  async toggleWishlist(userId, productId) {
    const product = await Product.findById(productId);
    if (!product) throw createError("Product not found", 404);

    const user = await User.findById(userId);
    const isWishlisted = user.wishlist.some((id) => id.toString() === productId);

    if (isWishlisted) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    } else {
      user.wishlist.push(productId);
    }

    await user.save();
    const result = await this.getWishlist(userId);
    return { ...result, wishlisted: !isWishlisted };
  }
}

export default new UserService();
