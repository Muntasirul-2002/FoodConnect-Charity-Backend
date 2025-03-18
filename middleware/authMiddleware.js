import JWT from "jsonwebtoken";
import HostelModel from "../models/HostelModel.js";
import ngoModel from "../models/ngoModel.js";
import resModel from "../models/resModel.js";
import adminModel from "../models/adminModel.js";
//Protected routes token base
export const requireSignIn = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ success: false, message: "Token not provided" });
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).send({ success: false, message: "Unauthorized - Invalid Token" });
  }
};
//hostel access
export const isHostel = async (req, res, next) => {
  try {
    console.log("Decoded User:", req.user); // Log decoded user info
    const user = await HostelModel.findById(req.user._id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Hostel user not found",
      });
    }
    if (user.role !== "hostel") {
      return res.status(401).send({
        success: false,
        message: "Unauthorized - Not a hostel user",
      });
    }
    next();
  } catch (error) {
    console.error("Error in Hostel middleware:", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Hostel middleware",
    });
  }
};
export const isAdmin = async (req, res, next) => {
  try {
    const user = await adminModel.findById(req.user._id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Admin user not found",
      });
    }
    if (user.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Unauthorized - Not a admin user",
      });
    }
    next();
  } catch (error) {
    console.error("Error in admin middleware:", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
//ngo access
export const isNgo = async (req,res,next)=>{
  try {
    const user = await ngoModel.findById(req.user._id)
    if(user.role === !"ngo"){
      return res.status(401).send({
        success: false,
        message: "UnAuthorized access to NGO admin panel"
      })

    }else{
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(401).send({
      success: false,
      error,
      message:"Error in NGO middleware"
    })
  }
}
// restaurant access 
export const isRestaurant = async(req,res,next)=> {
  try {
    const user = await resModel.findById(req.user._id)
    if(user.role === !"restaurant"){
      return res.status(401).send({
        success : false,
        message : "UnAuthorized ! You're not allowed to access restaurant dashboard"
      })
    }else{
      next()
    }
  } catch (error) {
    console.log("Error in accessing restaurant dashboard", error)
    res.status(401).send({
      success: false,
      error,
      message:"Error in Restaurant middleware"
    })
  }
}