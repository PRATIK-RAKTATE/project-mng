import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import { normalizeDate, weekRange } from "../utils/dates.js";

const populateTask = [
  { path: "projectId", model: "Project" },
  { path: "slotId", model: "Slot" }
];

function mapTask(task) {
  return {
    ...task.toObject(),
    project: task.projectId || null,
    slot: task.slotId || null
  };
}

export async function getTasks(req, res) {
  const rows = await Task.find()
    .populate(populateTask)
    .sort({ startDate: 1, order: 1, createdAt: -1 });

  res.json({ data: rows.map(mapTask) });
}

export async function getTasksByDay(req, res) {
  const date = normalizeDate(req.params.date);

  const rows = await Task.find({ startDate: date })
    .populate(populateTask)
    .sort({ order: 1, createdAt: -1 });

  res.json({ data: rows.map(mapTask) });
}

export async function getTasksByWeek(req, res) {
  const dates = weekRange(normalizeDate(req.params.date));

  const rows = await Task.find({ startDate: { $in: dates } })
    .populate(populateTask)
    .sort({ startDate: 1, order: 1, createdAt: -1 });

  const grouped = dates.map((date) => ({
    date,
    tasks: rows.filter((task) => task.startDate === date).map(mapTask)
  }));

  res.json({ data: grouped });
}

export async function getTasksByProjectSlug(req, res) {
  const project = await Project.findOne({ slug: req.params.slug });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const rows = await Task.find({ projectId: project._id })
    .populate(populateTask)
    .sort({ startDate: 1, order: 1, createdAt: -1 });

  res.json({ data: rows.map(mapTask) });
}

export async function createTask(req, res) {
  const payload = {
    ...req.body,
    startDate: normalizeDate(req.body.startDate || new Date().toISOString().slice(0, 10))
  };

  const data = await Task.create(payload);
  const hydrated = await Task.findById(data._id).populate(populateTask);
  res.status(201).json({ data: mapTask(hydrated) });
}

export async function updateTask(req, res) {
  const payload = { ...req.body };
  if (payload.startDate) payload.startDate = normalizeDate(payload.startDate);
  if (payload.endDate) payload.endDate = normalizeDate(payload.endDate);

  const data = await Task.findByIdAndUpdate(req.params.id, payload, { new: true }).populate(populateTask);
  res.json({ data: mapTask(data) });
}

export async function completeTask(req, res) {
  const data = await Task.findByIdAndUpdate(
    req.params.id,
    {
      status: "completed",
      completedAt: new Date()
    },
    { new: true }
  ).populate(populateTask);

  res.json({ data: mapTask(data) });
}

export async function moveTaskToDate(req, res) {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  task.movedFromDate = task.startDate;
  task.startDate = normalizeDate(req.body.targetDate);
  task.status = "pending";
  await task.save();

  const hydrated = await Task.findById(task._id).populate(populateTask);
  res.json({ data: mapTask(hydrated) });
}

export async function deleteTask(req, res) {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
}