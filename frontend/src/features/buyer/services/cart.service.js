import {
  getCartAPI,
  addToCartAPI,
  updateCartQuantityAPI,
  removeFromCartAPI,
  getWishlistAPI,
  toggleWishlistAPI,
} from "../../../api/user.api";

class CartService {
  getCart() {
    return getCartAPI();
  }

  async addToCart(productId, quantity = 1) {
    const data = await addToCartAPI(productId, quantity);
    window.dispatchEvent(new Event("cart-changed"));
    return data;
  }

  async updateCartQuantity(productId, quantity) {
    const data = await updateCartQuantityAPI(productId, quantity);
    window.dispatchEvent(new Event("cart-changed"));
    return data;
  }

  async removeFromCart(productId) {
    const data = await removeFromCartAPI(productId);
    window.dispatchEvent(new Event("cart-changed"));
    return data;
  }

  getWishlist() {
    return getWishlistAPI();
  }

  async toggleWishlist(productId) {
    const data = await toggleWishlistAPI(productId);
    window.dispatchEvent(new Event("wishlist-changed"));
    return data;
  }
}

export default new CartService();
