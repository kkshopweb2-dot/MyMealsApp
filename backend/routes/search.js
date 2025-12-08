import express from "express";
import { searchMeals } from "../controllers/searchController.js";

const router = express.Router();

router.get("/", searchMeals);

export default router;
