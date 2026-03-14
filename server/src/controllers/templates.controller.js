import Template from "../models/template.model.js";

export async function getDefaultTemplate(req, res) {
  let data = await Template.findOne({ active: true }).sort({ updatedAt: -1 });

  if (!data) {
    data = await Template.create({
      name: "Default Template",
      items: ["Wake up", "Plan day", "Deep work", "Sleep"],
      active: true
    });
  }

  res.json({ data });
}

export async function saveDefaultTemplate(req, res) {
  let template = await Template.findOne({ active: true });

  if (!template) {
    template = await Template.create({
      name: req.body.name || "Default Template",
      items: req.body.items || [],
      active: true
    });
  } else {
    template.name = req.body.name || template.name;
    template.items = Array.isArray(req.body.items) ? req.body.items : template.items;
    await template.save();
  }

  res.json({ data: template });
}