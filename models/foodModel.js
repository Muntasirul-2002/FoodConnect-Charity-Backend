import mongoose from 'mongoose'

const foodSchema = new mongoose.Schema({
    name: String,
    slug: String,
    description: String,
    quantity: Number,
    hosName : String,
    restaurant: String,
    location: String,
    landmark: String,
    category: String,
    contact: Number,
    images: [String]
},{timestamps: true})

const foodModel = mongoose.model("foods", foodSchema)

export default foodModel;