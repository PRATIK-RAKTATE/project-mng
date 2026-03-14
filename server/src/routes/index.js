import { Router } from "express";
import projectsRoutes from "./projects.routes.js";
import tasksRoutes from "./tasks.routes.js";
import slotsRoutes from "./slots.routes.js";
import templatesRoutes from "./templates.routes.js";
import searchRoutes from "./search.routes.js";

const router = Router();

router.use("/projects", projectsRoutes);
router.use("/tasks", tasksRoutes);
router.use("/slots", slotsRoutes);
router.use("/templates", templatesRoutes);
router.use("/search", searchRoutes);

export default router;