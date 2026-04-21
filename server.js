import express from "express";
import cors from "cors";
import connectDB from "./controller/user_controller.js";
import router from "./routes/user_routes.js";
import taskRoutes from "./routes/taskRoute.js";
import pathRouter from "./routes/careerRoutes.js";

connectDB();

const app = express();

// middle ware
app.use(cors());
app.use(express.json());

app.use("/login_users", router);
app.use("/mytask", taskRoutes);
app.use("/", pathRouter)

// MongoDB Connection
app.listen(5000, () => {
    console.log("ser id running on 5000 port");
    
})

