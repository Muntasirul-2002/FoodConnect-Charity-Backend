import express from "express";
import {
  cancelOrderController,
  createOrderController,
  getAllOrdersController,
  getSingleOrderController,
  updateOrderController,
} from "../controller/orderController.js";

const orderRouter = express.Router();

//create order
orderRouter.post("/create-order", createOrderController);

//get all orders
orderRouter.get("/get-orders", getAllOrdersController);

//get order by id
orderRouter.get("/get-orders/:userID", getSingleOrderController);

//update order
orderRouter.put("/update-order/:id", updateOrderController);

//cancel order
orderRouter.post("/cancel-order/:id", cancelOrderController);

export default orderRouter;
