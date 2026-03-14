import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tasksApi } from "../api/tasks.api";

export default function WeekViewPage() {
  const { date } = useParams();
  const [days, setDays] = useState([]);

  useEffect(() => {
    tasksApi.getByWeek(date).then((res) => setDays(res.data));
  }, [date]);

  return (
    <div className="stack">
      <h2>Week View - {date}</h2>
      {days.map((day) => (
        <div key={day.date} className="card">
          <strong>{day.date}</strong>
          <div className="stack-sm">
            {day.tasks.length ? day.tasks.map((task) => <div key={task._id} className="muted">{task.title} · {task.project?.name || "No Project"}</div>) : <div className="muted">No tasks</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
