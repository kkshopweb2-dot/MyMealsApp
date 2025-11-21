import express from "express";
import { getMeals, getPlansList } from "../controllers/mealController.js";

const router = express.Router();

router.get("/", getMeals);
router.get("/plansList", getPlansList);

export default router;
