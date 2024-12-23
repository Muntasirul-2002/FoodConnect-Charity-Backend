import foodModel from "../models/foodModel.js";
import slugify from "slugify";
import ngoModel from "../models/ngoModel.js";
import mongoose from "mongoose";

// export const addFoodController = async (req, res) => {
//   try {
//     const {
//       foodName: name,
//       description,
//       quantity,
//       restaurant,
//       location,
//       landmark,
//       category,
//       contact,
//     } = req.body;
//     const images = req.files.map((file) => file.filename) || [];
//     const slug = slugify(name, { lower: true });

//     const newFood = new foodModel({
//       name,
//       description,
//       quantity,
//       restaurant,
//       location,
//       landmark,
//       category,
//       images,
//       slug,
//       contact,
//     });

//     await newFood.save();
//     res.status(201).json({
//       success: true,
//       message: "Food Added successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Error while adding food",
//       error: error.message,
//     });
//   }
// };
export const addFoodController = async (req, res) => {
  try {
    const {
      foodName: name,
      description,
      quantity,
      location,
      landmark,
      category,
      contact,
      userRole, // Add userRole to req.body (passed from frontend)
    } = req.body;

    const images = req.files.map((file) => file.filename) || [];
    const slug = slugify(name, { lower: true });

    // Initialize the data object
    const foodData = {
      name,
      description,
      quantity,
      location,
      landmark,
      category,
      images,
      slug,
      contact,
    };

    // Conditionally add restaurant or hosName based on user role
    if (userRole === "restaurant") {
      foodData.restaurant = req.body.restaurant; // Add restaurant field
    } else if (userRole === "hostel") {
      foodData.hosName = req.body.hosName; // Add hosName field
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid user role",
      });
    }

    // Save the food item in the database
    const newFood = new foodModel(foodData);
    await newFood.save();

    res.status(201).json({
      success: true,
      message: "Food added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while adding food",
      error: error.message,
    });
  }
};

export const allFoodListController = async (req, res) => {
  try {
    const viewFood = await foodModel.find();
    res.status(200).send({
      success: true,
      message: "All Foods List",
      viewFood,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Something went wrong in getting food list",
    });
  }
};

export const singleFoodController = async (req, res) => {
  try {
    const viewSingleFood = await foodModel.findOne({
      slug: req.params.slug,
    });
    res.status(200).send({
      success: true,
      message: "Single food fetched successfully",
      viewSingleFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something went wrong while fetching single food",
    });
  }
};

export const deleteAllFoodController = async (req, res) => {
  try {
    const deleteFoodById = await foodModel.findByIdAndDelete({
      _id: req.params.pid,
    });
    res.status(200).send({
      success: true,
      message: "Single food deleted successfully",
      deleteFoodById,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something went wrong while deleting single food",
    });
  }
};


export const addCartItemController = async (req, res) => {
  try {
    const { foodID, userID, role } = req.body;
    console.log({ foodID, userID, role });
    const user = await ngoModel.findById(userID);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    const food = await foodModel.findById(foodID);
    if (!food) {
      return res
        .status(404)
        .send({ success: false, message: "Food not found" });
    }

    if (!user.cart) {
      user.cart = [];
    }

    user.cart.push(food);

    const updateUser = await user.save();
    console.log(updateUser);

    res.status(200).json({ cart: updateUser.cart });
  } catch (error) {
    console.log("Error in adding food in cart :", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getCartItemController = async (req, res) => {
  try {
    const { userID } = req.body;
    const user = await ngoModel.findById(userID).populate("cart");
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    res.status(200).send({ success: true, cart: user.cart });
  } catch (error) {
    console.log("Error in getting food from cart :", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const removeCartItemController = async (req, res) => {
  try {
    const { userID, foodID } = req.body;
    const user = await ngoModel.findById(userID);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    const food = await foodModel.findById(foodID);
    if (!food) {
      return res
        .status(404)
        .send({ success: false, message: "Food not found" });
    }
    if (!user.cart || user.cart.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "User's cart is empty" });
    }

    const updateCart = user.cart.filter((item) => String(item._id) !== foodID);
    user.cart = updateCart;
    await user.save()
    res.status(200).send({ cart: updateCart.cart });
  } catch (error) {
    console.log("Error in removing item from cart :", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
