import { getToken } from '../utils/localStorage';

const API_BASE_URL = 'https://togglenestbackend.vercel.app/api';

console.log('🔗 API Base URL:', API_BASE_URL);

// Create fetch wrapper with auth
export const api = {
  get: async (endpoint) => {
    const token = getToken();
    
    console.log(`📤 GET ${endpoint}`, { hasToken: !!token });
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });

    const data = await response.json();
    
    console.log(`📥 GET ${endpoint} Response:`, data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
    
    return data;
  },

  post: async (endpoint, body) => {
    const token = getToken();
    
    console.log(`📤 POST ${endpoint}`, { hasToken: !!token, body });
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    
    console.log(`📥 POST ${endpoint} Response:`, data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
    
    return data;
  },

  put: async (endpoint, body) => {
    const token = getToken();
    
    console.log(`📤 PUT ${endpoint}`, { hasToken: !!token, body });
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    
    console.log(`📥 PUT ${endpoint} Response:`, data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
    
    return data;
  },

  patch: async (endpoint, body) => {
    const token = getToken();
    
    console.log(`📤 PATCH ${endpoint}`, { hasToken: !!token, body });
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    
    console.log(`📥 PATCH ${endpoint} Response:`, data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
    
    return data;
  },

  delete: async (endpoint) => {
    const token = getToken();
    
    console.log(`📤 DELETE ${endpoint}`, { hasToken: !!token });
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });

    const data = await response.json();
    
    console.log(`📥 DELETE ${endpoint} Response:`, data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
    
    return data;
  }
};
