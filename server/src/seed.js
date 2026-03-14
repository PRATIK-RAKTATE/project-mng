import { connectDB } from "./config/db.js";
import Project from "./models/project.model.js";
import Slot from "./models/slot.model.js";
import Template from "./models/template.model.js";

async function seed() {
  await connectDB();

  const projectCount = await Project.countDocuments();
  if (!projectCount) {
    await Project.insertMany([
      { name: "Personal", slug: "personal", color: "#22c55e", order: 1 },
      { name: "Clients", slug: "clients", color: "#3b82f6", order: 2 },
      { name: "College Studies", slug: "college-studies", color: "#f59e0b", order: 3 }
    ]);
  }

  const slotCount = await Slot.countDocuments();
  if (!slotCount) {
    await Slot.insertMany([
      { name: "Wake Up", startTime: "06:00", endTime: "06:30", order: 1 },
      { name: "Breakfast", startTime: "08:00", endTime: "08:30", order: 2 },
      { name: "Lunch", startTime: "13:00", endTime: "13:30", order: 3 },
      { name: "Sleep", startTime: "23:00", endTime: "23:30", order: 4 }
    ]);
  }

  const templateCount = await Template.countDocuments();
  if (!templateCount) {
    await Template.create({
      name: "Default Template",
      items: ["Wake up", "Deep work", "Client work", "Study", "Sleep"],
      active: true
    });
  }

  console.log("Seed complete");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});