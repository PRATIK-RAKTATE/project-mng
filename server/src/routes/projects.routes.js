import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject
} from "../controllers/projects.controller.js";

const router = Router();

router.get("/", getProjects);
router.post("/", createProject);
router.patch("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;