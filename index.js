import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import authRouter from "./router/authRoute.js";
import foodRouter from "./router/foodRoute.js";
import hostelRoute from "./router/hostelRoute.js";
import orderRoute from "./router/orderRoute.js";

dotenv.config();
const app = express();
const port = 8080;

//cors setup
const allowedOrigin = [
  "http://localhost:8080",
  "http://localhost:3000",
  "https://foodconnect-charity-backend.onrender.com/",
  "http://foodconnect-charity-backend.onrender.com/",
  "https://foodconnect-charity-backend.onrender.com",
  "http://foodconnect-charity-backend.onrender.com",
  "https://food-connect-kgr.vercel.app/",
  "https://food-connect-kgr.vercel.app",
  "http://food-connect-kgr.vercel.app/",
  undefined
]

const corsOptions = {
  origin:( origin, callback) => {
    if(allowedOrigin.includes(origin)){
      callback(null,true)
    }else{
      callback(new Error(`Not allowed by cors origin: ${origin}`))
    }
  },
  credentials: true
}


// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, "routes", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
//setup middleware
app.use(cors(corsOptions))
app.use(express.json());


//default router
app.get("/", (req, res) => {
  res.send("Welcome to the foodConnect backend server");
});

//api routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/food', foodRouter)
app.use('/api/v1/hostel', hostelRoute)
app.use("/api/v1/order", orderRoute)
app.use("/image", express.static(path.join(__dirname, "uploads")));

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
});
