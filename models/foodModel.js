import mongoose from 'mongoose'

const foodSchema = new mongoose.Schema({
    name: String,
    slug: String,
    description: String,
    quantity: Number,
    // hostelName: { type: mongoose.Schema.Types.ObjectId, ref: "hostel_users" },
    // restaurantDetails: { type: mongoose.Schema.Types.ObjectId, ref: "restaurant_user" },
    hostelName : String,
    sellerId : String,
    location: String,
    landmark: String,
    category: String,
    contact: Number,
    images: [String]
},{timestamps: true})

const foodModel = mongoose.model("foods", foodSchema)

export default foodModel;