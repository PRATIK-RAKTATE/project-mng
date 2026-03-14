export function todayString() {
  return new Date().toISOString().slice(0, 10);
}

export function addDays(dateString, count) {
  const d = new Date(dateString);
  d.setDate(d.getDate() + count);
  return d.toISOString().slice(0, 10);
}

export function weekDates(startDate) {
  return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString();
}
