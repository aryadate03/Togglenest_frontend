// src/services/authService.js

// ✅ BULLETPROOF: Direct assignment, no complex expressions
const API_BASE_URL = 'https://togglenestbackend.vercel.app/api';
const API_URL = `${API_BASE_URL}/auth`;

console.log('🔗 Auth Service API URL:', API_URL);

export const register = async (userData) => {
  try {
    console.log('📤 Registering user:', userData.email);
    console.log('🌐 Request URL:', `${API_URL}/register`);
    
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log('📥 Register response:', data);

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Registration failed');
    }

    return data;
  } catch (error) {
    console.error('❌ Register error:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    console.log('📤 Logging in:', credentials.email);
    console.log('🌐 Request URL:', `${API_URL}/login`);
    
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    console.log('📥 Login response:', data);

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Login failed');
    }

    return data;
  } catch (error) {
    console.error('❌ Login error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  console.log('👋 User logged out');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const getToken = () => {
  return localStorage.getItem('token');
};
