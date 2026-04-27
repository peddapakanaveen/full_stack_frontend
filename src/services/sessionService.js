import API from "./api";

export const bookSession = (sessionData) => {
  return API.post("/sessions", sessionData);
};