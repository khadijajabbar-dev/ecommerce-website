import { getAllProductsAPI, getProductByIdAPI } from "../../../api/product.api";

class BuyerProductService {
  getAllProducts(page, limit, category) {
    return getAllProductsAPI(page, limit, category);
  }

  getProductById(productId) {
    return getProductByIdAPI(productId);
  }
}

export default new BuyerProductService();