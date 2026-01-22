import api from './api';

const taskService = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await api.get('/tasks');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Get tasks by project ID
  getTasksByProject: async (projectId) => {
    try {
      const response = await api.get(`/projects/${projectId}/tasks`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project tasks:', error);
      throw error;
    }
  },

  // Get single task by ID
  getTaskById: async (taskId) => {
    try {
      const response = await api.get(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw error;
    }
  },

  // Create new task
  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update existing task
  updateTask: async (taskId, taskData) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, taskData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete task
  deleteTask: async (taskId) => {
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  // Update task status
  updateTaskStatus: async (taskId, status) => {
    try {
      const response = await api.patch(`/tasks/${taskId}/status`, { status });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error updating task status:', error);
      throw error;
    }
  },

  // Update task priority
  updateTaskPriority: async (taskId, priority) => {
    try {
      const response = await api.patch(`/tasks/${taskId}/priority`, { priority });
      return response.data;
    } catch (error) {
      console.error('Error updating task priority:', error);
      throw error;
    }
  },

  // Assign task to user
  assignTask: async (taskId, userId) => {
    try {
      const response = await api.post(`/tasks/${taskId}/assign`, { userId });
      return response.data;
    } catch (error) {
      console.error('Error assigning task:', error);
      throw error;
    }
  },

  // Search tasks
  searchTasks: async (searchTerm) => {
    try {
      const response = await api.get('/tasks/search', {
        params: { q: searchTerm }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching tasks:', error);
      throw error;
    }
  },

  // Filter tasks by status
  filterTasksByStatus: async (status) => {
    try {
      const response = await api.get('/tasks/filter', {
        params: { status }
      });
      return response.data;
    } catch (error) {
      console.error('Error filtering tasks:', error);
      throw error;
    }
  }
};

export default taskService;