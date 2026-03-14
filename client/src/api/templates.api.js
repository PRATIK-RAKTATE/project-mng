import { http } from "./http";

export const templatesApi = {
  getDefault: () => http.get("/templates/default"),
  saveDefault: (payload) => http.patch("/templates/default", payload)
};
