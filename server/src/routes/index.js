import express from "express";
import { fetchShortUri, getUrl, startServer } from "../controllers/index.js";

const router = express.Router();

router.get("/", startServer);
router.post("/url", getUrl);
router.get("/search/:id", fetchShortUri);
export default router;
