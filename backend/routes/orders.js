import express from "express";
import { createOrder, getOrders, upload } from "../controllers/orderController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", upload.single('screenshot'), createOrder);
router.get("/", verifyToken, getOrders);

export default router;
