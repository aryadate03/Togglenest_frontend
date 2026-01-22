import api from "./api";

export const fetchActivityLogs = async () => {
  const { data } = await api.get("/activity-logs");
  return data;
};