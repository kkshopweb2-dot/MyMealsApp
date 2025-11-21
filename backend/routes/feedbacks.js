import express from "express";
import {
  getFeedbacks,
  createFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getFeedbacks);
router.post("/", verifyToken, createFeedback);
router.get("/:id", verifyToken, getFeedback);
router.put("/:id", verifyToken, updateFeedback);
router.delete("/:id", verifyToken, deleteFeedback);

export default router;
