import foodModel from "../models/foodModel.js";
import slugify from "slugify";
export const addFoodController = async (req, res) => {
  try {
    const {
      foodName:name,
      description,
      quantity,
      restaurant,
      location,
      landmark,
      category,
      contact
    } = req.body;
    const images = req.files.map((file) => file.filename) || [];
    const slug = slugify(name, { lower: true });

    const newFood = new foodModel({
      name,
      description,
      quantity,
      restaurant,
      location,
      landmark,
      category,
      images,
      slug,
      contact
    });

    await newFood.save();
    res.status(201).json({
      success: true,
      message: "Food Added successfully",
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


export const allFoodListController = async(req,res)=>{
    try {
        const viewFood = await foodModel.find()
        res.status(200).send({
            success: true,
            message: "All Foods List",
            viewFood
        })
    } catch (error) {
      console.log(error)
      res.status(404).send({
        success: false,
        message: "Something went wrong in getting food list"
      })  
    }
}

export const singleFoodController = async (req,res)=>{
  try {
    const viewSingleFood = await foodModel.findOne({
      slug:req.params.slug,
    })
    res.status(200).send({
      success:true,
      message:"Single food fetched successfully",
      viewSingleFood
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"something went wrong while fetching single food"
    })
    
  }
}

export const deleteAllFoodController = async (req,res)=>{
  try {
    const deleteFoodById = await foodModel.findByIdAndDelete({_id: req.params.pid})
    res.status(200).send({
      success:true,
      message:"Single food deleted successfully",
      deleteFoodById
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"something went wrong while deleting single food"
    })
  }
}