import { Router } from "express";
import {
  getDefaultTemplate,
  saveDefaultTemplate
} from "../controllers/templates.controller.js";

const router = Router();

router.get("/default", getDefaultTemplate);
router.patch("/default", saveDefaultTemplate);

export default router;