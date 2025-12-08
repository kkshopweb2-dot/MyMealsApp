import express from "express";
import {
  getComplaints,
  createComplaint,
  getComplaint,
  updateComplaint,
  deleteComplaint,
  getAllComplaints,
} from "../controllers/complaintController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getComplaints);
router.get("/all", verifyToken, getAllComplaints); // New route for admin to get all complaints
router.post("/", verifyToken, createComplaint);
router.get("/:id", verifyToken, getComplaint);
router.put("/:id", verifyToken, updateComplaint);
router.delete("/:id", verifyToken, deleteComplaint);

export default router;
