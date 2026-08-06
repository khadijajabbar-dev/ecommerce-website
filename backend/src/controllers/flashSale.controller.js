import flashSaleService from "../services/flashSale.service.js";

// ==========================
// Create Flash Sale (seller only)
// ==========================
export const createFlashSale = async (req, res, next) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({
        success: false,
        message: "Only sellers can create flash sales",
      });
    }

    const result = await flashSaleService.createFlashSale(req.user.id, req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Get active flash sales (public)
// ==========================
export const getActiveFlashSales = async (req, res, next) => {
  try {
    const result = await flashSaleService.getActiveFlashSales();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Get logged-in seller's own flash sales
// ==========================
export const getMyFlashSales = async (req, res, next) => {
  try {
    const result = await flashSaleService.getMyFlashSales(req.user.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Update Flash Sale
// ==========================
export const updateFlashSale = async (req, res, next) => {
  try {
    const result = await flashSaleService.updateFlashSale(req.user.id, req.params.id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Delete Flash Sale
// ==========================
export const deleteFlashSale = async (req, res, next) => {
  try {
    const result = await flashSaleService.deleteFlashSale(req.user.id, req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
