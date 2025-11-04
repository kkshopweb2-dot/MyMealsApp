import express from "express";
import {
  getMealPreferences,
  createMealPreference,
  getMealPreference,
  updateMealPreference,
  deleteMealPreference,
} from "../controllers/mealPreferenceController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getMealPreferences);
router.post("/", verifyToken, createMealPreference);
router.get("/:id", verifyToken, getMealPreference);
router.put("/:id", verifyToken, updateMealPreference);
router.delete("/:id", verifyToken, deleteMealPreference);

export default router;
