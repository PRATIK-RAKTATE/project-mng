import { useEffect, useState } from "react";
import { projectsApi } from "../api/projects.api";
import { tasksApi } from "../api/tasks.api";
import { slotsApi } from "../api/slots.api";
import ProjectList from "../components/ProjectList";
import TaskList from "../components/TaskList";
import SlotList from "../components/SlotList";
import TaskForm from "../components/TaskForm";

export default function MainViewPage() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [projectsRes, tasksRes, slotsRes] = await Promise.all([projectsApi.getAll(), tasksApi.getAll(), slotsApi.getAll()]);
      setProjects(projectsRes.data);
      setTasks(tasksRes.data);
      setSlots(slotsRes.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <div className="card">Loading...</div>;

  return (
    <div className="stack">
      <h2>Main View</h2>
      <TaskForm projects={projects} slots={slots} onSubmit={async (payload) => { await tasksApi.create(payload); await load(); }} />
      <section className="stack"><h3>Fixed Slots</h3><SlotList slots={slots} /></section>
      <section className="stack"><h3>Projects</h3><ProjectList projects={projects} /></section>
      <section className="stack"><h3>All Tasks</h3><TaskList tasks={tasks} onComplete={async (id) => { await tasksApi.complete(id); await load(); }} onMove={async (id, targetDate) => { await tasksApi.move(id, targetDate); await load(); }} /></section>
    </div>
  );
}
