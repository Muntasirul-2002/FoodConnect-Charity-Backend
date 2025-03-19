import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    foodItem: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foods",
      },
    ],
    food_name: [
      {
        type: String,
      },
    ],
    address: {
      name: { type: String, required: true },
      ngo: { type: String, required: true },
      contact: { type: String, required: true },
      location: { type: String, required: true },
      landmark: { type: String },
      mapLink: { type: String },
    },

    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGO_users",
    },
   sellerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "hostel_users",
    required: true,
   },
    status: {
      type: String,
      default: "UnProcessed",
      enum: [
        "Not Process",
        "UnProcessed",
        "Packaging",
        "Shipped",
        "Delivered",
        "Cancel",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Orders", orderSchema);
