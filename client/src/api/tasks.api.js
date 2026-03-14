import { http } from "./http";

export const tasksApi = {
  getAll: () => http.get("/tasks"),
  getByDay: (date) => http.get(`/tasks/day/${date}`),
  getByWeek: (date) => http.get(`/tasks/week/${date}`),
  getByProjectSlug: (slug) => http.get(`/tasks/project/${slug}`),
  create: (payload) => http.post("/tasks", payload),
  update: (id, payload) => http.patch(`/tasks/${id}`, payload),
  complete: (id) => http.patch(`/tasks/${id}/complete`, {}),
  move: (id, targetDate) => http.patch(`/tasks/${id}/move`, { targetDate }),
  remove: (id) => http.delete(`/tasks/${id}`)
};
