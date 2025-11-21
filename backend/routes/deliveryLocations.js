import express from "express";
import {
  getDeliveryLocations,
  createDeliveryLocation,
  getDeliveryLocation,
  updateDeliveryLocation,
  deleteDeliveryLocation,
} from "../controllers/deliveryLocationController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getDeliveryLocations);
router.post("/", verifyToken, createDeliveryLocation);
router.get("/:id", verifyToken, getDeliveryLocation);
router.put("/:id", verifyToken, updateDeliveryLocation);
router.delete("/:id", verifyToken, deleteDeliveryLocation);

export default router;
