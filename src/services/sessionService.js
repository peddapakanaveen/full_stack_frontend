import API from "./api";

export const bookSession = (data) => {
  return API.post("/sessions", data);
};