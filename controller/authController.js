
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import HostelModel from "../models/HostelModel.js";
import ngoModel from "../models/ngoModel.js";
import resModel from "../models/resModel.js";
import JWT from 'jsonwebtoken'
import slugify from "slugify";
// ngo signup  controller
export const ngoSignupController = async (req, res) => {
  try {
    const { orgName, email, password, name, mobile, address, memberId, role } =
      req.body;
    if (
      !orgName ||
      !email ||
      !password ||
      !name ||
      !mobile ||
      !address ||
      !memberId ||
      !role
    ) {
      return res.send({ message: "All fields are required" });
    }

    //check existing email
    const existingEmail = await ngoModel.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).send({ message: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const ngoUser = new ngoModel({
      orgName,
      email,
      password: hashedPassword,
      name,
      mobile,
      address,
      memberId,
      role,
    }).save();

    res
      .status(200)
      .send({ message: "Ngo Organization added successfully", ngoUser });
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, message: "Organization already exists" });
  }
};

// restaurant signup  controller
export const restaurantSignupController = async (req, res) => {
  try {
    const { resName, email, password, name, address, landmark, phone, role } = req.body;
    
    // Check for required fields
    if (!resName || !email || !password || !name || !address || !landmark || !phone || !role) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    // Check for existing restaurant registered
    const existingEmail = await resModel.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).send({ success: false, message: "Email is already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const resUser = await new resModel({
      resName,
      email,
      password: hashedPassword,
      name,
      address,
      landmark,
      phone,
      role
    }).save();

    res.status(200).send({ success: true, message: "Restaurant Added Successfully !!", resUser });
  } catch (error) {
    return res.status(400).send({ success: false, message: "Something went wrong: ", error });
  }
};


// hostel signup controller
export const hostelSignupController = async (req,res)=>{
  try {
    const {hosName, email, password, name, address, landmark, phone, role} = req.body;
    const slug = slugify(hosName, {lower: true});
    if(!hosName || !email || !password || !name || !address || !landmark || !phone || !role){
      return res.status(404).send({success: false, message:"All fields are required"})
    }

    const existingEmail = await HostelModel.findOne({email: email})
    if(existingEmail){
      return res.status(400).send({success: false, message:"Duplicate email"})
    }
    const hashedPassword = await hashPassword(password)

    const hosUser = new HostelModel({
      hosName,
      email, password: hashedPassword, name, address, landmark, phone, role, slug,
    }).save()
    res.status(200).send({success:true, message:"Hostel Signup Successfully", hosUser})
  } catch (error) {
    return res.status(400).send({success:false, message:"Something went wrong:", error})
   
  }
}

//login function
export const loginController = async (req,res) =>{
  try {
    const {email, password, role} = req.body;
    if(!email || !password || !role){
      return res.status(400).send({success: false, message: "All fields are required"})
    }
    let user;
    switch (role) {
      case "hostel":
        user = await HostelModel.findOne({email})
        break;
      case "restaurant":
        user = await resModel.findOne({email})
        break;
      case "ngo" :
        user = await ngoModel.findOne({email})
        break;
    
      default:
        return res.status(400).send({ message: "Invalid role" });
    }

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await comparePassword(password, user.password)
    if(!isMatch){
      return res.status(400).send({ message: "Invalid password" });
    }

    //Token 
    const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET,{
      expiresIn: "7d"
    })
    res.status(200).send({
      success: true,
      message: "Login Successful",
      user:{
        email:email,
        role:role,
        userID: user._id
      },
      token
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in Login",
      error,
    });
  }
}

//view-all-hostel-users
export const ViewAllHostelUsersController = async(req,res) => {
  try {
    const viewAllHostelUsers = await HostelModel.find()
    res.status(200).send({
      success: true,
      message: "All Hostel Users",
      viewAllHostelUsers
  })
  } catch (error) {
    console.log(error)
      res.status(404).send({
        success: false,
        message: "Something went wrong in getting food list"
      })  

    }
    
  

}

//get-all-hostels
export const GetAllHostelController = async (req,res)=> {
  try {
    const getAllHostel = await HostelModel.find({},'hosName')
    res.status(200).send({
      success: true,
      message: "All Hostels found",
      getAllHostel
    })
  } catch (error) {
console.log(error)
res.status(404).send({
  success: false,
  message: "Something went wrong in getting all Hostels"
})    
  }
}