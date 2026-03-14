export default function SlotList({ slots }) {
  if (!slots.length) return <div className="card">No slots configured.</div>;
  return (
    <div className="stack">
      {slots.map((slot) => (
        <div key={slot._id} className="card">
          <strong>{slot.name}</strong>
          <div className="muted">{slot.startTime} - {slot.endTime}</div>
        </div>
      ))}
    </div>
  );
}
