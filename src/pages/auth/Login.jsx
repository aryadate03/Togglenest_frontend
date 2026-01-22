import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../services/authService';
import { setToken, setUser as saveUserToStorage } from '../../utils/localStorage';
import '../../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('🔐 Login attempt with:', formData.email);

    try {
      // Real API Call
      const response = await login(formData);
      
      console.log('✅ Full login response:', response);
      console.log('📦 Response structure:', {
        success: response.success,
        hasData: !!response.data,
        hasToken: !!response.data?.token,
        hasUser: !!response.data
      });
      
      // ✅ FIX: Extract from response.data (backend sends it nested)
      const token = response.data?.token;
      const user = {
        _id: response.data?._id,
        name: response.data?.name,
        email: response.data?.email,
        role: response.data?.role,
        avatar: response.data?.avatar
      };
      
      // ✅ Save token and user to localStorage
      if (token) {
        setToken(token);
        saveUserToStorage(user);
        
        console.log('💾 Token saved:', token.substring(0, 20) + '...');
        console.log('👤 User saved:', user);
        
        // ✅ Verify token is saved
        const savedToken = localStorage.getItem('token');
        console.log('✅ Token verification:', savedToken ? 'Token exists in localStorage' : '❌ Token NOT saved');
        
        // Update context
        setUser(user);
        setIsAuthenticated(true);
        
        // Success message
        alert('✅ Login Successful!');
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        console.error('❌ No token in response!');
        console.error('Response data:', response.data);
        setError('Login failed: No authentication token received');
      }
      
    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🎯 ToggleNest</h1>
          <h2>Welcome Back</h2>
          <p>Login to manage your projects</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;