import { http } from "./http";

export const projectsApi = {
  getAll: () => http.get("/projects"),
  create: (payload) => http.post("/projects", payload),
  update: (id, payload) => http.patch(`/projects/${id}`, payload),
  remove: (id) => http.delete(`/projects/${id}`)
};
