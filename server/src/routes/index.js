import express from "express";
import { startServer } from "../controllers/index.js";

const router = express.Router();

router.get("/", startServer);

export default router;
