import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tasksApi } from "../api/tasks.api";
import TaskList from "../components/TaskList";

export default function ProjectViewPage() {
  const { slug } = useParams();
  const [tasks, setTasks] = useState([]);

  const load = async () => {
    const res = await tasksApi.getByProjectSlug(slug);
    setTasks(res.data);
  };

  useEffect(() => { load(); }, [slug]);

  return (
    <div className="stack">
      <h2>Project - {slug}</h2>
      <TaskList tasks={tasks} onComplete={async (id) => { await tasksApi.complete(id); await load(); }} onMove={async (id, targetDate) => { await tasksApi.move(id, targetDate); await load(); }} />
    </div>
  );
}
