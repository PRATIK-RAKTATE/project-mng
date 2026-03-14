import Project from "../models/project.model.js";
import Slot from "../models/slot.model.js";
import Task from "../models/task.model.js";
import Template from "../models/template.model.js";

export async function universalSearch(req, res) {
  const q = String(req.query.q || "").trim();

  if (!q) {
    return res.json({
      data: {
        tasks: [],
        projects: [],
        slots: [],
        templates: []
      }
    });
  }

  const regex = new RegExp(q, "i");

  const [tasks, projects, slots, templates] = await Promise.all([
    Task.find({
      $or: [{ title: regex }, { description: regex }]
    })
      .populate("projectId")
      .populate("slotId")
      .limit(20),

    Project.find({ name: regex }).limit(20),
    Slot.find({ name: regex }).limit(20),
    Template.find({
      $or: [{ name: regex }, { items: regex }]
    }).limit(20)
  ]);

  res.json({
    data: {
      tasks: tasks.map((task) => ({
        ...task.toObject(),
        project: task.projectId || null,
        slot: task.slotId || null
      })),
      projects,
      slots,
      templates
    }
  });
}