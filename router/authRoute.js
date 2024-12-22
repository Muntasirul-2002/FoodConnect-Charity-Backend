import express from 'express'
import { GetAllRestaurantsController, hostelSignupController, loginController, ngoSignupController, restaurantSignupController, ViewAllHostelUsersController } from '../controller/authController.js'
import { isHostel, isNgo, isRestaurant, requireSignIn } from '../middleware/authMiddleware.js'
const authRouter = express.Router()

//ngo signup
authRouter.post('/ngo-signup', ngoSignupController )
authRouter.post('/restaurant-signup', restaurantSignupController)
authRouter.post('/hostel-signup', hostelSignupController)
authRouter.post('/login', loginController)
authRouter.get("/hostel-users", ViewAllHostelUsersController)
authRouter.get("/restaurant-users", GetAllRestaurantsController)
authRouter.get('/hostel-auth', requireSignIn, isHostel, (req,res)=>{
    res.status(200).send({ok:true})
})
authRouter.get('/ngo-auth', requireSignIn, isNgo, (req,res)=>{
    res.status(200).send({ok:true})
})

authRouter.get("/res-auth", requireSignIn, isRestaurant, (req,res)=> {
    res.status(200).send({ok:true})
} )

export default authRouter