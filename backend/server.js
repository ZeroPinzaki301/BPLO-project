import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";

import BrgyBusinessRoutes from "./routes/BrgyBusiness.routes.js";
import AdminRoutes from "./routes/Admin.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/brgy-business", BrgyBusinessRoutes);
app.use("/api/admin", AdminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});