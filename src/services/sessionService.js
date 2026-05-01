import API from "./api";

// Book session (send to backend)
export const bookSession = (sessionData) => {
  return API.post("/sessions", sessionData);
};