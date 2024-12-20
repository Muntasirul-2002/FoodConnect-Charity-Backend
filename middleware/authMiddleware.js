import JWT from "jsonwebtoken";
import HostelModel from "../models/HostelModel.js";
import ngoModel from "../models/ngoModel.js";

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
    const user = await HostelModel.findById(req.user._id);
    if (user.role === !"hostel") {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in Hostel middleware",
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