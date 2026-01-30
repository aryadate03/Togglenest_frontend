import { api } from './api';

export const getTasks = async (projectId) => {
  const endpoint = projectId ? `/tasks?project=${projectId}` : '/tasks';
  return await api.get(endpoint);
};

export const getTaskById = async (id) => {
  return await api.get(`/tasks/${id}`);
};

export const createTask = async (taskData) => {
  return await api.post('/tasks', taskData);
};

export const updateTask = async (id, taskData) => {
  return await api.put(`/tasks/${id}`, taskData);
};

export const deleteTask = async (id) => {
  return await api.delete(`/tasks/${id}`);
};
