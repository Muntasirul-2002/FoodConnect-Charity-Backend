import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRouter from "./router/authRoute.js";

dotenv.config();
const app = express();
const port = 8080;
app.use(express.json());


//default router
app.get("/", (req, res) => {
  res.send("Welcome to the foodConnect backend server");
});

//api routes
app.use('/api/v1/auth', authRouter)

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
});
