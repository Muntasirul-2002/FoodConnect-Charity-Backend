import express from 'express'
import { ngoSignupController } from '../controller/authController.js'
const authRouter = express.Router()

//ngo signup
authRouter.post('/ngo-signup', ngoSignupController )


export default authRouter