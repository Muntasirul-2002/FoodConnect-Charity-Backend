import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema({
    hosName:{
        type: String,
        required: true,
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
        default:"owner"
    }
})

export default mongoose.model("hostel_users", hostelSchema)