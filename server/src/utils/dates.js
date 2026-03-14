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


export function normalizeDate(dateString) {
  return new Date(dateString).toISOString().slice(0, 10);
}


export function weekRange(startDate) {
  return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
}

export function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}