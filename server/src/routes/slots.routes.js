import { Router } from "express";
import {
  createSlot,
  deleteSlot,
  getSlots,
  updateSlot
} from "../controllers/slots.controller.js";

const router = Router();

router.get("/", getSlots);
router.post("/", createSlot);
router.patch("/:id", updateSlot);
router.delete("/:id", deleteSlot);

export default router;