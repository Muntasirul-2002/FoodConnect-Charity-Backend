import orderModel from "../models/orderModel.js";
// import {sendSms} from '../utils/smsService.js'
export const createOrderController = async (req, res) => {
  try {
    const { foodItem, food_name, address, buyer, sellerRole } = req.body;
    if (!foodItem || !food_name || !address || !buyer) {
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
    }
    if(sellerRole === "restaurant"){
      orderData.seller_restaurant = req.body.seller_restaurant;
    }else if(sellerRole === "hostel"){
      orderData.seller_hostel = req.body.seller_hostel;
    }else{
      return res.status(400).json({
        success: false,
        message: "Invalid seller role",
      })
    }
    // const newOrder = new orderModel({
    //   foodItem,
    //   food_name,
    //   address,
    //   buyer,
    // });
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
    const order = await orderModel.findById(req.params.id)
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

export const getOrderBySellerController = async (req,res)=> {
  try {
    
  } catch (error) {
    
  }
}

export const getOrderByIdController =async (req,res)=>{
  try {
    const orderById = await orderModel.findById(req.params.id)
    if (!orderById) {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
    } else {
      res.json(orderById);
    }
  } catch (error) {
    console.log("Error in getting single order : ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }

}
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
