import { getAllProductsAPI, getProductByIdAPI } from "../../../api/product.api";

class HomeProductService {
  getAllProducts(page = 1, limit = 8, category = "") {
    return getAllProductsAPI(page, limit, category);
  }

  getProductById(productId) {
    return getProductByIdAPI(productId);
  }
}

export default new HomeProductService();
