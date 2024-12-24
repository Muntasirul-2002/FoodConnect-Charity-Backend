import orderModel from "../models/orderModel.js";

export const createOrderController = async (req, res) => {
  try {
    const { foodItem, food_name, address, buyer } = req.body;
    if (!foodItem || !food_name || !address || !buyer) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }
    const newOrder = new orderModel({
      foodItem,
      food_name,
      address,
      buyer,
    });
    await newOrder.save();
    res.status(200).json({
      success: true,
      message: "Order has been created",
      order: newOrder,
    });
  } catch (error) {
    console.log("Error in creating order : ", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const getAllOrders = await orderModel.find();
    res.status(200).json(getAllOrders);
  } catch (error) {
    console.log("Error in fetching orders : ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getSingleOrderController = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
    } else {
      res.json(order);
    }
  } catch (error) {
    console.log("Error in getting single order : ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateOrderController = async (req, res) => {
  try {
    const updateOrder = await orderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log(updateOrder);
    if (!updateOrder) {
      res.status(404).json({
        success: false,
        message: "Order not updated",
        error: error.message,
      });
    }
    res.status(200).json({ success: true, updateOrder: updateOrder });
  } catch (error) {
    console.log("Error in updating order : ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const cancelOrderController = async (req, res) => {
  try {
    const { id } = req.params;
    const canceledOrder = await orderModel.findById(id);
    if (!canceledOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
        error: error.message,
      });
    }
    canceledOrder.status = "Cancel";
    await canceledOrder.save();
    res.status(200).json({
      success: true,
      message: "Order has been canceled",
      canceledOrder : canceledOrder
    });
  } catch (error) {
    console.error("Error in canceling order: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel the order",
      error: error.message,
    });
  }
};
