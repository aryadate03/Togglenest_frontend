import { api } from './api';

// Get all tasks (optionally filtered by project)
export const getTasks = async (projectId = null) => {
  try {
    const endpoint = projectId ? `/tasks?project=${projectId}` : '/tasks';
    return await api.get(endpoint);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Get single task by ID
export const getTaskById = async (id) => {
  try {
    return await api.get(`/tasks/${id}`);
  } catch (error) {
    console.error('Error fetching task:', error);
    throw error;
  }
};

// Create new task
export const createTask = async (taskData) => {
  try {
    return await api.post('/tasks', taskData);
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Update task
export const updateTask = async (id, taskData) => {
  try {
    return await api.put(`/tasks/${id}`, taskData);
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Update task status
export const updateTaskStatus = async (id, status) => {
  try {
    return await api.patch(`/tasks/${id}`, { status });
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};

// Delete task
export const deleteTask = async (id) => {
  try {
    return await api.delete(`/tasks/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
