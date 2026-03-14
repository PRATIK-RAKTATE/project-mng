import { useState } from "react";
import MoveTaskModal from "./MoveTaskModal";

export default function TaskList({ tasks, onComplete, onMove }) {
  const [selectedTask, setSelectedTask] = useState(null);
  if (!tasks.length) return <div className="card">No tasks found.</div>;

  return (
    <>
      <div className="stack">
        {tasks.map((task) => (
          <div key={task._id} className="card">
            <div className="task-row">
              <div>
                <strong>{task.title}</strong>
                <div className="muted">{task.project?.name || "No Project"} · {task.priority} · {task.startDate?.slice(0, 10)}</div>
                {task.slot && <div className="muted">Slot: {task.slot.name} ({task.slot.startTime} - {task.slot.endTime})</div>}
                {task.description ? <p>{task.description}</p> : null}
              </div>
              <div className="task-actions">
                <button onClick={() => onComplete(task._id)} disabled={task.status === "completed"}>{task.status === "completed" ? "Done" : "Complete"}</button>
                <button onClick={() => setSelectedTask(task)}>Move</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <MoveTaskModal task={selectedTask} open={Boolean(selectedTask)} onClose={() => setSelectedTask(null)} onMove={onMove} />
    </>
  );
}
