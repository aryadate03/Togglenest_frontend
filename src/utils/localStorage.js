// Get token from localStorage
export const getToken = () => {
  const token = localStorage.getItem('token');
  console.log('📦 Getting token:', token ? 'Token exists' : 'No token');
  return token;
};

// Set token to localStorage
export const setToken = (token) => {
  console.log('💾 Saving token to localStorage');
  localStorage.setItem('token', token);
};

// Remove token from localStorage
export const removeToken = () => {
  console.log('🗑️ Removing token');
  localStorage.removeItem('token');
};

// Get user from localStorage
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Set user to localStorage
export const setUser = (user) => {
  console.log('💾 Saving user to localStorage');
  localStorage.setItem('user', JSON.stringify(user));
};

// Remove user from localStorage
export const removeUser = () => {
  console.log('🗑️ Removing user');
  localStorage.removeItem('user');
};

// Clear all auth data
export const clearAuth = () => {
  removeToken();
  removeUser();
  console.log('🧹 Cleared all auth data');
};
