import { Router } from "express";
import {
  completeTask,
  createTask,
  deleteTask,
  getTasks,
  getTasksByDay,
  getTasksByProjectSlug,
  getTasksByWeek,
  moveTaskToDate,
  updateTask
} from "../controllers/tasks.controller.js";

const router = Router();

router.get("/", getTasks);
router.get("/day/:date", getTasksByDay);
router.get("/week/:date", getTasksByWeek);
router.get("/project/:slug", getTasksByProjectSlug);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.patch("/:id/complete", completeTask);
router.patch("/:id/move", moveTaskToDate);
router.delete("/:id", deleteTask);

export default router;