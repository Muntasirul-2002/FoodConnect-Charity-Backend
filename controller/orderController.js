import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";
// import {sendSms} from '../utils/smsService.js'
export const createOrderController = async (req, res) => {
  try {
    console.log("Received Order Data :", req.body)
    const { foodItem, food_name, address, buyer, sellerId } = req.body;
    if (!foodItem || !food_name || !address || !buyer || !sellerId) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }
    
    const orderData = {
      foodItem,
      food_name,
      address,
      buyer,
      sellerId,
    };
    const newOrder = new orderModel(orderData)
    await newOrder.save();
    res.status(200).json({
      success: true,
      message: "Order has been created",
      order: newOrder,
    });

    // const message = `Thank you for your order, ${address.name} ! Here are your order details:
    
    // Food Item : ${food_name.join(',')}
    // Total Item : ${food_name.length}
    // Delivery Address : ${address.location}
    // Map : ${address.mapLink}
    // We will contact you shortly
    // `
    // await sendSms(address.contact, message)
  } catch (error) {
    console.log("Error in creating order: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.log("Error in fetching orders : ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getOrdersByBuyerIdController = async (req, res) => {
  try {
    const orders = await orderModel.find({buyerId : req.params.buyerId})
    if (!orders.length) {
      return res.status(400).json({
        success: false,
        message: "buyer Not Found or No Orders for this buyer",
      });
    }
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log("Error in getting orders for buyer : ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getOrderBySellerController = async (req, res) => {
  try {
    const orders = await orderModel.find({sellerId:req.params.sellerId});

    if (!orders.length) {
      return res.status(400).json({
        success: false,
        message: "Seller Not Found or No Orders for this Seller",
      });
    }

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// export const getOrderByIdController =async (req,res)=>{
//   try {
//     const orderById = await orderModel.findById(req.params.id)
//     if (!orderById) {
//       res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     } else {
//       res.json(orderById);
//     }
//   } catch (error) {
//     console.log("Error in getting single order : ", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }

// }
// export const updateOrderController = async (req, res) => {
//   try {
//     const updateOrder = await orderModel.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     console.log(updateOrder);
//     if (!updateOrder) {
//       res.status(404).json({
//         success: false,
//         message: "Order not updated",
//         error: error.message,
//       });
//     }
//     res.status(200).json({ success: true, updateOrder: updateOrder });
//   } catch (error) {
//     console.log("Error in updating order : ", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };
export const updateOrderController = async (req, res) => {
  try {
    const {id} = req.params;
    const {status} = req.body;
    const updateOrder = await orderModel.findByIdAndUpdate(id, {status}, {new : true});
    if(!updateOrder){
      return res.status(404).json({
        error : "Order not found"
      })
    }
    res.json({success : true, order : updateOrder})
  } catch (error) {
    console.log("Error in updating order status", error)
    res.status(500).json({success: false,
      message: "Internal Server Error",});
    
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
