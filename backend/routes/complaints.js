import express from "express";
import {
  getComplaints,
  createComplaint,
  getComplaint,
  updateComplaint,
  deleteComplaint,
} from "../controllers/complaintController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getComplaints);
router.post("/", verifyToken, createComplaint);
router.get("/:id", verifyToken, getComplaint);
router.put("/:id", verifyToken, updateComplaint);
router.delete("/:id", verifyToken, deleteComplaint);

export default router;
