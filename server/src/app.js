import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { handleError } from "./middleware/errorHandler.js";
import { LimitActions } from "./middleware/rateLimiter.js";
import userRoutes from "./routes/index.js";
const app = express();
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected"))
  .catch((err) => console.log("error occured"));
app.use(express.json());
app.use(LimitActions);
app.use("/", userRoutes);
app.use(handleError);
export default app;
