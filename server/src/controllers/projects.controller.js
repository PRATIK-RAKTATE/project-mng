import Project from "../models/project.model.js";
import { slugify } from "../utils/dates.js";

export async function getProjects(req, res) {
  const data = await Project.find({ archived: false }).sort({ order: 1, createdAt: 1 });
  res.json({ data });
}

export async function createProject(req, res) {
  const { name, color } = req.body;
  const slug = slugify(name);

  const data = await Project.create({
    name,
    slug,
    color: color || "#3b82f6"
  });

  res.status(201).json({ data });
}

export async function updateProject(req, res) {
  const { id } = req.params;
  const update = { ...req.body };

  if (update.name) update.slug = slugify(update.name);

  const data = await Project.findByIdAndUpdate(id, update, { new: true });
  res.json({ data });
}

export async function deleteProject(req, res) {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
}