import { useState } from "react";
import { todayString } from "../utils/date";

export default function MoveTaskModal({ task, open, onClose, onMove }) {
  const [targetDate, setTargetDate] = useState(todayString());
  if (!open || !task) return null;

  const submit = async (e) => {
    e.preventDefault();
    await onMove(task._id, targetDate);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal card" onClick={(e) => e.stopPropagation()}>
        <h3>Move task</h3>
        <p>{task.title}</p>
        <form className="stack" onSubmit={submit}>
          <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
          <button type="submit">Move</button>
        </form>
      </div>
    </div>
  );
}
