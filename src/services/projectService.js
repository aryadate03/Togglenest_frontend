import { api } from './api';


export const getProjects = async () => {
  try {
    return await api.get('/projects');
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getProjectById = async (id) => {
  try {
    return await api.get(`/projects/${id}`);
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    return await api.post('/projects', projectData);
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const updateProject = async (id, projectData) => {
  try {
    return await api.put(`/projects/${id}`, projectData);
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    return await api.delete(`/projects/${id}`);
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
