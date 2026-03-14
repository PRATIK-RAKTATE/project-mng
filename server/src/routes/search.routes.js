import { Router } from "express";
import { universalSearch } from "../controllers/search.controller.js";

const router = Router();

router.get("/", universalSearch);

export default router;