import { hashPassword } from "../helper/authHelper.js";
import ngoModel from "../models/ngoModel.js";

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
