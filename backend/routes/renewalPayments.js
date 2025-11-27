import express from "express";
import {
  getRenewalPayments,
  createRenewalPayment,
  getRenewalPayment,
  updateRenewalPayment,
  deleteRenewalPayment,
} from "../controllers/renewalPaymentController.js";
import verifyToken from "../middleware/verifyToken.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.get("/", verifyToken, getRenewalPayments);
router.post("/", verifyToken, upload.any(), createRenewalPayment);
router.get("/:id", verifyToken, getRenewalPayment);
router.put("/:id", verifyToken, updateRenewalPayment);
router.delete("/:id", verifyToken, deleteRenewalPayment);

export default router;
