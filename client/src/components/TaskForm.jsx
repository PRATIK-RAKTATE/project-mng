import { useEffect, useState } from "react";
import { todayString } from "../utils/date";

const initialState = {
  title: "",
  description: "",
  projectId: "",
  priority: "medium",
  startDate: todayString(),
  endDate: "",
  slotId: ""
};

const defaultProjects = [
  { _id: "personal", name: "Personal" },
  { _id: "client", name: "Client Work" },
  { _id: "study", name: "Study" }
];

export default function TaskForm({ projects = [], slots = [], onSubmit, defaultDate }) {

  const projectList = projects.length ? projects : defaultProjects;

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (defaultDate) {
      setForm((prev) => ({ ...prev, startDate: defaultDate }));
    }
  }, [defaultDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.projectId) return;

    await onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      endDate: form.endDate || null,
      slotId: form.slotId || null
    });

    setForm((prev) => ({
      ...initialState,
      startDate: defaultDate || todayString(),
      projectId: prev.projectId
    }));
  };

  return (
    <form className="card stack" onSubmit={submit}>
      
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Task title"
        required
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        rows="3"
      />

      <select
        name="projectId"
        value={form.projectId}
        onChange={handleChange}
        required
      >
        <option value="">Select project</option>

        {projectList.map((project) => (
          <option key={project._id} value={project._id}>
            {project.name}
          </option>
        ))}
      </select>

      <select name="priority" value={form.priority} onChange={handleChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>

      <input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
      />

      <input
        type="date"
        name="endDate"
        value={form.endDate}
        onChange={handleChange}
      />

      <select name="slotId" value={form.slotId} onChange={handleChange}>
        <option value="">No slot</option>

        {slots.map((slot) => (
          <option key={slot._id} value={slot._id}>
            {slot.name} ({slot.startTime} - {slot.endTime})
          </option>
        ))}
      </select>

      <button type="submit">Add task</button>

    </form>
  );
}