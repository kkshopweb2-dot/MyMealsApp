import express from "express";
import {
  getPauseResumeMeals,
  createPauseResumeMeal,
  getPauseResumeMeal,
  updatePauseResumeMeal,
  deletePauseResumeMeal,
} from "../controllers/pauseResumeMealController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getPauseResumeMeals);
router.post("/", verifyToken, createPauseResumeMeal);
router.get("/:id", verifyToken, getPauseResumeMeal);
router.put("/:id", verifyToken, updatePauseResumeMeal);
router.delete("/:id", verifyToken, deletePauseResumeMeal);

export default router;
