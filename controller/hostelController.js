import HostelModel from "../models/HostelModel.js";

export const getAllHostelsController = async(req,res) => {
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