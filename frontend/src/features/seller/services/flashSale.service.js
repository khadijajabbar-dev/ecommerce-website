import {
  createFlashSaleAPI,
  getMyFlashSalesAPI,
  updateFlashSaleAPI,
  deleteFlashSaleAPI,
} from "../../../api/flashSale.api";

class FlashSaleService {
  createFlashSale(saleData) {
    return createFlashSaleAPI(saleData);
  }

  getMyFlashSales() {
    return getMyFlashSalesAPI();
  }

  updateFlashSale(saleId, saleData) {
    return updateFlashSaleAPI(saleId, saleData);
  }

  deleteFlashSale(saleId) {
    return deleteFlashSaleAPI(saleId);
  }
}

export default new FlashSaleService();
