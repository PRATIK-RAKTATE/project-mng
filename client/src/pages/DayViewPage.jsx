import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tasksApi } from "../api/tasks.api";
import { projectsApi } from "../api/projects.api";
import { slotsApi } from "../api/slots.api";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import SlotList from "../components/SlotList";

export default function DayViewPage() {
  const { date } = useParams();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [slots, setSlots] = useState([]);

  const load = async () => {
    const [taskRes, projectRes, slotRes] = await Promise.all([tasksApi.getByDay(date), projectsApi.getAll(), slotsApi.getAll()]);
    setTasks(taskRes.data);
    setProjects(projectRes.data);
    setSlots(slotRes.data);
  };

  useEffect(() => { load(); }, [date]);

  return (
    <div className="stack">
      <h2>Day View - {date}</h2>
      <TaskForm projects={projects} slots={slots} onSubmit={async (payload) => { await tasksApi.create(payload); await load(); }} defaultDate={date} />
      <h3>Slots</h3><SlotList slots={slots} />
      <h3>Tasks</h3>
      <TaskList tasks={tasks} onComplete={async (id) => { await tasksApi.complete(id); await load(); }} onMove={async (id, targetDate) => { await tasksApi.move(id, targetDate); await load(); }} />
    </div>
  );
}
