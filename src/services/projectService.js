import { api } from './api';

// Get all projects
export const getProjects = async () => {
  try {
    return await api.get('/projects');
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// Get single project by ID
export const getProjectById = async (id) => {
  try {
    return await api.get(`/projects/${id}`);
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

// Create new project
export const createProject = async (projectData) => {
  try {
    return await api.post('/projects', projectData);
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Update project
export const updateProject = async (id, projectData) => {
  try {
    return await api.put(`/projects/${id}`, projectData);
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

// Delete project
export const deleteProject = async (id) => {
  try {
    return await api.delete(`/projects/${id}`);
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
