 import { STORAGE_KEYS } from './constants';
 
 // Token save karo browser mein
 export const saveToken = (token) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
 };

 // Token retrieve karo browser se
export const getToken = () => {
  const token = localStorage.getItem('token');
  console.log('📦 Getting token:', token ? 'Token exists' : 'No token');
  return token;
};

export const setToken = (token) => {
  console.log('💾 Saving token to localStorage');
  localStorage.setItem('token', token);
};

// Token delete karo (Logout ke time)
export const removeToken = () => {
  console.log('🗑️ Removing token');
  localStorage.removeItem('token');
};
// User data save karo (Object hai toh JSON string mein convert karo)
export const saveUser = (user) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

// User data get karo (String se Object mein convert karo)
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setUser = (user) => {
  console.log('💾 Saving user to localStorage');
  localStorage.setItem('user', JSON.stringify(user));
};

// User data delete karo
export const removeUser = () => {
  localStorage.removeItem('user');
};

// Clear all
export const clearAuth = () => {
  removeToken();
  removeUser();
};


