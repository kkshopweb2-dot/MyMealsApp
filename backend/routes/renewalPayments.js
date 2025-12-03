import express from "express";
import {
  getRenewalPayments,
  createRenewalPayment,
  getRenewalPayment,
  updateRenewalPayment,
  deleteRenewalPayment,
  getLatestOrderNo,
} from "../controllers/renewalPaymentController.js";

import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// ===============================
// Fetch latest order number
// ===============================
router.get("/order-no", verifyToken, getLatestOrderNo);

// ===============================
// Renewal payment CRUD
// ===============================
router.get("/", verifyToken, getRenewalPayments);
router.post("/", verifyToken, createRenewalPayment);
router.get("/:id", verifyToken, getRenewalPayment);
router.put("/:id", verifyToken, updateRenewalPayment);
router.delete("/:id", verifyToken, deleteRenewalPayment);

export default router;

