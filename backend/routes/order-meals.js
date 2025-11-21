import express from "express";
import { getOrderMeals } from "../controllers/orderMealController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getOrderMeals);

export default router;
