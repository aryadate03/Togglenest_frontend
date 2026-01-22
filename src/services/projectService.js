import api from './api';

const projectService = {
  // Get all projects
  getAllProjects: async () => {
    try {
      const response = await api.get('/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Get single project by ID
  getProjectById: async (projectId) => {
    try {
      const response = await api.get(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  },

  // Create new project
  createProject: async (projectData) => {
    try {
      console.log('🔧 projectService.createProject called');
      console.log('📦 Data:', projectData);
      
      // Check token before API call
      const token = localStorage.getItem('token');
      console.log('🔑 Token exists:', !!token);
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const response = await api.post('/projects', projectData);
      
      console.log('✅ projectService: API Success');
      console.log('📨 Response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('❌ projectService: API Error:', error);
      throw error;
    }
  },

  // Update existing project
  updateProject: async (projectId, projectData) => {
    try {
      const response = await api.put(`/projects/${projectId}`, projectData);
      return response.data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  // Delete project
  deleteProject: async (projectId) => {
    try {
      const response = await api.delete(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  // Search projects
  searchProjects: async (searchTerm) => {
    try {
      const response = await api.get('/projects/search', {
        params: { q: searchTerm }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching projects:', error);
      throw error;
    }
  },

  // Add team member to project
  addTeamMember: async (projectId, memberId) => {
    try {
      const response = await api.post(`/projects/${projectId}/members`, { memberId });
      return response.data;
    } catch (error) {
      console.error('Error adding team member:', error);
      throw error;
    }
  },

  // Remove team member from project
  removeTeamMember: async (projectId, memberId) => {
    try {
      const response = await api.delete(`/projects/${projectId}/members/${memberId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing team member:', error);
      throw error;
    }
  }
};

export default projectService;