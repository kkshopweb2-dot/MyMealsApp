import express from "express";
import {
  getUserContactUpdates,
  createUserContactUpdate,
  getUserContactUpdate,
  updateUserContactUpdate,
  deleteUserContactUpdate,
} from "../controllers/userContactUpdateController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getUserContactUpdates);
router.post("/", verifyToken, createUserContactUpdate);
router.get("/:id", verifyToken, getUserContactUpdate);
router.put("/:id", verifyToken, updateUserContactUpdate);
router.delete("/:id", verifyToken, deleteUserContactUpdate);

export default router;
