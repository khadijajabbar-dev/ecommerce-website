

import {
  createProductAPI,
  getMyProductsAPI,
  getProductByIdAPI,
  updateProductAPI,
  deleteProductAPI,
  getTrashProductsAPI,
  restoreProductAPI,
  permanentDeleteProductAPI,
} from "../../../api/product.api";

class ProductService {
  createProduct(productData) {
    return createProductAPI(productData);
  }

  getMyProducts() {
    return getMyProductsAPI();
  }

  getProductById(productId) {
    return getProductByIdAPI(productId);
  }

  updateProduct(productId, productData) {
    return updateProductAPI(productId, productData);
  }

  deleteProduct(productId) {
    return deleteProductAPI(productId);
  }

  getTrash() {
    return getTrashProductsAPI();
  }

  restoreProduct(productId) {
    return restoreProductAPI(productId);
  }

  permanentDeleteProduct(productId) {
    return permanentDeleteProductAPI(productId);
  }
}

export default new ProductService();