import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Request Interceptor - Add token to every request
api.interceptors.request.use(
  (config) => {
    // ✅ FIX: Direct localStorage.getItem instead of getToken()
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Debug logging
    console.log('🚀 API Request:', {
      method: config.method.toUpperCase(),
      url: config.url,
      fullURL: config.baseURL + config.url,
      data: config.data,
      hasToken: !!token,
      token: token ? `${token.substring(0, 20)}...` : 'No token'
    });
    
    return config;
  },
  (error) => {
    console.error('❌ Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor - Handle errors
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      message: error.message,
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });

    // Network Error
    if (!error.response) {
      console.error('🔴 Network Error: Cannot connect to backend');
      console.error('🔍 Check if backend is running at:', API_BASE_URL);
      
      return Promise.reject({
        message: '❌ Cannot connect to server. Please check if backend is running at ' + API_BASE_URL,
        type: 'NETWORK_ERROR'
      });
    }

    const status = error.response.status;
    
    if (status === 401) {
      console.warn('🔐 Unauthorized: Token invalid or expired');
      
      // ✅ Clear token on 401
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // ✅ Redirect to login after small delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
      
      return Promise.reject({
        message: 'Session expired. Please login again.',
        type: 'UNAUTHORIZED',
        response: error.response
      });
    }

    if (status === 403) {
      return Promise.reject({
        message: 'Access forbidden. You do not have permission.',
        type: 'FORBIDDEN',
        response: error.response
      });
    }

    if (status === 404) {
      return Promise.reject({
        message: 'Resource not found.',
        type: 'NOT_FOUND',
        response: error.response
      });
    }

    if (status === 500) {
      return Promise.reject({
        message: 'Server error. Please try again later.',
        type: 'SERVER_ERROR',
        response: error.response
      });
    }

    return Promise.reject(
      error.response?.data || { 
        message: 'Something went wrong',
        type: 'UNKNOWN_ERROR',
        response: error.response
      }
    );
  }
);

export default api;