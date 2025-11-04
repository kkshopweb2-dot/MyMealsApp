import express from "express";
import {
  getPayments,
  createPayment,
  getPayment,
  updatePayment,
  deletePayment,
} from "../controllers/paymentController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getPayments);
router.post("/", verifyToken, createPayment);
router.get("/:id", verifyToken, getPayment);
router.put("/:id", verifyToken, updatePayment);
router.delete("/:id", verifyToken, deletePayment);

export default router;
