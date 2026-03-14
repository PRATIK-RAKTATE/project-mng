import { http } from "./http";

export const slotsApi = {
  getAll: () => http.get("/slots"),
  create: (payload) => http.post("/slots", payload),
  update: (id, payload) => http.patch(`/slots/${id}`, payload),
  remove: (id) => http.delete(`/slots/${id}`)
};
