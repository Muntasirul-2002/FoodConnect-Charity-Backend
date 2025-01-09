import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    googleId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "admin" },
    createdAt: { type: Date, default: Date.now },
});


export default mongoose.model("admin_users", adminSchema)