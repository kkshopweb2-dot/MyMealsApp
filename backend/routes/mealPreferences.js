import express from "express";
import {
  getMealPreferences,
  createMealPreference,
  getMealPreference,
  updateMealPreference,
  deleteMealPreference,
} from "../controllers/mealPreferenceController.js";

const router = express.Router();

router.get("/", getMealPreferences);
router.post("/", createMealPreference);
router.get("/:id", getMealPreference);
router.put("/:id", updateMealPreference);
router.delete("/:id", deleteMealPreference);

export default router;
