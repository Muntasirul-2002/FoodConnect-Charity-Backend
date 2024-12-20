import express from 'express'
import { GetAllHostelController, hostelSignupController, loginController, ngoSignupController, restaurantSignupController, ViewAllHostelUsersController } from '../controller/authController.js'
import { isHostel, isNgo, requireSignIn } from '../middleware/authMiddleware.js'
const authRouter = express.Router()

//ngo signup
authRouter.post('/ngo-signup', ngoSignupController )
authRouter.post('/restaurant-signup', restaurantSignupController)
authRouter.post('/hostel-signup', hostelSignupController)
authRouter.post('/login', loginController)
authRouter.get("/hostel-users", ViewAllHostelUsersController)
authRouter.get('/get-all-hostels', GetAllHostelController)
authRouter.get('/hostel-auth', requireSignIn, isHostel, (req,res)=>{
    res.status(200).send({ok:true})
})
authRouter.get('/ngo-auth', requireSignIn, isNgo, (req,res)=>{
    res.status(200).send({ok:true})
})

export default authRouter