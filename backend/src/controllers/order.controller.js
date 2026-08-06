

import orderService from "../services/order.service.js";

export const buyNow = async (req, res, next) => {
  try {
    const result = await orderService.buyNow(req.user.id, req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const checkoutCart = async (req, res, next) => {
  try {
    const result = await orderService.checkoutCart(req.user.id, req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const confirmOrder = async (req, res, next) => {
  try {
    const result = await orderService.confirmOrder(req.params.token);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const dispatchOrder = async (req, res, next) => {
  try {
    const result = await orderService.dispatchOrder(req.user.id, req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deliverOrder = async (req, res, next) => {
  try {
    const result = await orderService.deliverOrder(req.user.id, req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getSellerOrders = async (req, res, next) => {
  try {
    const result = await orderService.getSellerOrders(req.user.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getBuyerOrders = async (req, res, next) => {
  try {
    const result = await orderService.getBuyerOrders(req.user.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const result = await orderService.getOrderById(req.user.id, req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};