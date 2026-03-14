import { http } from "./http";

export const searchApi = {
  query: (q) => http.get(`/search?q=${encodeURIComponent(q)}`)
};
