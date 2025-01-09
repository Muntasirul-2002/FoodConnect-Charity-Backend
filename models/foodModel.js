import mongoose from 'mongoose'

const foodSchema = new mongoose.Schema({
    name: String,
    slug: String,
    description: String,
    quantity: Number,
    hostelDetails: { type: mongoose.Schema.Types.ObjectId, ref: "hostel_users" },
    restaurantDetails: { type: mongoose.Schema.Types.ObjectId, ref: "restaurant_user" },
    location: String,
    landmark: String,
    category: String,
    contact: Number,
    images: [String]
},{timestamps: true})

const foodModel = mongoose.model("foods", foodSchema)

export default foodModel;