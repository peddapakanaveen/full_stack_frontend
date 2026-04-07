import API from "./api";

export const getAllCareers = () => API.get("/careers");

export const getCareerById = (id) => API.get(`/careers/${id}`);