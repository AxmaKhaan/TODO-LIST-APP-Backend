// require('dotenv').config()
import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./controller/user_controller.js";
import router from "./routes/user_routes.js";
import taskRoutes from "./routes/taskRoute.js";
import pathRouter from "./routes/careerRoutes.js";

connectDB();

const app = express();

// middle ware
app.use(
  cors({
    origin: "https://todo-list-app-frontend-six.vercel.app/",
    credentials: true,
  })
);
app.use(express.json());

app.use("/login_users", router);
app.use("/mytask", taskRoutes);
app.use("/", pathRouter)

// MongoDB Connection
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on ${PORT} port`);
});

