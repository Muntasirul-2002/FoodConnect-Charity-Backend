import mongoose from "mongoose";

const ngoSchema = new mongoose.Schema({
  orgName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  memberId: {
    type: String,
    default: "21QM1A0582",
  },
  role: {
    type: String,
    default: "owner",
  },
});

export default mongoose.model("NGO_users", ngoSchema);
