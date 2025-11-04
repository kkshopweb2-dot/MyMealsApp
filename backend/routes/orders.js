import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", verifyToken, getOrders);

export default router;
