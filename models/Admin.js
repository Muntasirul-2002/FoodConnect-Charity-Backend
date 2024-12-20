import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        select :false,
    },
    role:{
        type:String,
        default:"admin"
    }
})

export default mongoose.model("admin_users", adminSchema)