import express from "express";
import {
  getRenewalPayments,
  createRenewalPayment,
  getRenewalPayment,
  updateRenewalPayment,
  deleteRenewalPayment,
} from "../controllers/renewalPaymentController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getRenewalPayments);
router.post("/", verifyToken, createRenewalPayment);
router.get("/:id", verifyToken, getRenewalPayment);
router.put("/:id", verifyToken, updateRenewalPayment);
router.delete("/:id", verifyToken, deleteRenewalPayment);

export default router;
