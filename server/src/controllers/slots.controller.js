import Slot from "../models/slot.model.js";

export async function getSlots(req, res) {
  const data = await Slot.find().sort({ order: 1, startTime: 1 });
  res.json({ data });
}

export async function createSlot(req, res) {
  const data = await Slot.create(req.body);
  res.status(201).json({ data });
}

export async function updateSlot(req, res) {
  const data = await Slot.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ data });
}

export async function deleteSlot(req, res) {
  await Slot.findByIdAndDelete(req.params.id);
  res.json({ message: "Slot deleted" });
}