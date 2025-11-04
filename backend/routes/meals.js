import express from "express";
import { getMeals } from "../controllers/mealController.js";

const router = express.Router();

router.get("/", getMeals);

export default router;
