import express from "express";
import {
  getFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback
} from "../controllers/feedbackController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// Get all feedbacks
router.get("/", verifyToken, getFeedbacks);

// Get single feedback by ID
router.get("/:id", verifyToken, getFeedbackById);

// Create feedback
router.post("/", verifyToken, createFeedback);

// Update feedback
router.put("/:id", verifyToken, updateFeedback);

// Delete feedback
router.delete("/:id", verifyToken, deleteFeedback);

export default router;

