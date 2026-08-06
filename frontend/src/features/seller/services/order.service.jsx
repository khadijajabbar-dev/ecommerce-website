


import { getSellerOrdersAPI, dispatchOrderAPI, deliverOrderAPI } from "../../../api/order.api";

class SellerOrderService {
  getSellerOrders() {
    return getSellerOrdersAPI();
  }

  dispatchOrder(orderId) {
    return dispatchOrderAPI(orderId);
  }

  deliverOrder(orderId) {
    return deliverOrderAPI(orderId);
  }
}

export default new SellerOrderService();
