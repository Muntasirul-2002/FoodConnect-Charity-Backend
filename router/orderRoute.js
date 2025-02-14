import express from "express";
import {
  cancelOrderController,
  createOrderController,
  getAllOrdersController,
  getOrderBySellerController,
  getOrdersByBuyerIdController,
  updateOrderController,
} from "../controller/orderController.js";

const orderRouter = express.Router();

//create order
orderRouter.post("/create-order", createOrderController);

//get all orders
orderRouter.get("/get-orders", getAllOrdersController);

//get order by id
orderRouter.get("/get-orders/:buyerId", getOrdersByBuyerIdController);

//get orders by seller id
orderRouter.get("/get-orders/:sellerId", getOrderBySellerController);

// //get order by id for update
// orderRouter.get("/get-order/:id", getOrderByIdController)

//update order
orderRouter.put("/update-order-status/:id", updateOrderController);

//cancel order
orderRouter.post("/cancel-order/:id", cancelOrderController);


export default orderRouter;
