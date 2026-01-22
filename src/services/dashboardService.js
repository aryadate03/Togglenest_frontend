// src/services/dashboardService.js

const API_URL = 'http://localhost:5000/api'; // Update with your backend URL

export const getDashboardStats = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/dashboard/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch dashboard stats');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getCompletionRate = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/dashboard/completion-rate`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch completion rate');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getTopProjects = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/dashboard/top-projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch top projects');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getProjectsTaskData = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/dashboard/projects-task-data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch projects task data');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getUploadedPurposeData = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/dashboard/uploaded-purpose-data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch uploaded purpose data');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getRecentActivity = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/dashboard/recent-activity`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch recent activity');
    }

    return data;
  } catch (error) {
    throw error;
  }
};