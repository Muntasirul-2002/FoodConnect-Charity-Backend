import mongoose from "mongoose";
const restaurantSchema = new mongoose.Schema({
    resName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    landmark:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        default:"restaurant"
    }
})

export default mongoose.model("restaurant_user", restaurantSchema)