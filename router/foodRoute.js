import express from 'express'
import { addFoodController, allFoodListController, deleteAllFoodController, singleFoodController } from '../controller/foodController.js'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import {fileURLToPath} from 'url'

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
const upload = multer({ storage: storage });
const foodRouter = express.Router()

foodRouter.post('/add-food', upload.array("images", 3), addFoodController)
foodRouter.get('/food-list', allFoodListController)
foodRouter.get('/single-food/:slug', singleFoodController)
foodRouter.delete('/delete-food/:pid', deleteAllFoodController)

export default foodRouter;