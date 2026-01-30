import { api } from './api';

export const getProjects = async () => {
  return await api.get('/projects');
};

export const getProjectById = async (id) => {
  return await api.get(`/projects/${id}`);
};

export const createProject = async (projectData) => {
  return await api.post('/projects', projectData);
};

export const updateProject = async (id, projectData) => {
  return await api.put(`/projects/${id}`, projectData);
};

export const deleteProject = async (id) => {
  return await api.delete(`/projects/${id}`);
};
