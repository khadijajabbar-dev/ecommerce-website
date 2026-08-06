

import {
  buyNowAPI,
  checkoutCartAPI,
  getBuyerOrdersAPI,
  confirmOrderAPI,
  getOrderByIdAPI,
} from "../../../api/order.api";

class BuyerOrderService {
  buyNow(orderData) {
    return buyNowAPI(orderData);
  }

  checkoutCart(checkoutData) {
    return checkoutCartAPI(checkoutData);
  }

  getMyOrders() {
    return getBuyerOrdersAPI();
  }

  confirmOrder(token) {
    return confirmOrderAPI(token);
  }

  getOrderById(orderId) {
    return getOrderByIdAPI(orderId);
  }
}

export default new BuyerOrderService();
