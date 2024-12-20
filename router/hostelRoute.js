import express from 'express'
import { getAllHostelsController } from '../controller/hostelController.js';

const hostelRoute = express.Router()

hostelRoute.get('/get-hostels', getAllHostelsController)


export default hostelRoute;