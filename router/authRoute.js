import express from 'express'
import { adminSignupController, GetAllAdminController, GetAllRestaurantsController, hostelSignupController, loginController, ngoSignupController, restaurantSignupController, ViewAllHostelUsersController } from '../controller/authController.js'
import { isAdmin, isHostel, isNgo, isRestaurant, requireSignIn } from '../middleware/authMiddleware.js'
const authRouter = express.Router()

//ngo signup
authRouter.post('/ngo-signup', ngoSignupController )
authRouter.post('/admin-signup', adminSignupController)
authRouter.post('/restaurant-signup', restaurantSignupController)
authRouter.post('/hostel-signup', hostelSignupController)
authRouter.post('/login', loginController)
authRouter.get("/hostel-users", ViewAllHostelUsersController)
authRouter.get("/restaurant-users", GetAllRestaurantsController)
authRouter.get("/get-all-admin", GetAllAdminController)
authRouter.get('/hostel-auth', requireSignIn, isHostel, (req,res)=>{
    res.status(200).send({ok:true})
})
authRouter.get('/admin-auth', requireSignIn, isAdmin, (req,res)=>{
    res.status(200).send({ok:true})
})
authRouter.get('/ngo-auth', requireSignIn, isNgo, (req,res)=>{
    res.status(200).send({ok:true})
})

authRouter.get("/res-auth", requireSignIn, isRestaurant, (req,res)=> {
    res.status(200).send({ok:true})
} )

export default authRouter