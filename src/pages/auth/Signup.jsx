import React, { useState } from 'react'; // ✅ Added useEffect
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';
import '../../styles/Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'member'
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

    // Frontend Validation
    if (formData.password !== formData.confirmPassword) {
      setError('❌ Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      setError('❌ Password must be at least 6 characters!');
      return;
    }

    if (formData.name.length < 2) {
      setError('❌ Name must be at least 2 characters!');
      return;
    }

    setLoading(true);

    try {
      // Prepare data for backend
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      };

      console.log('📤 Submitting registration:', userData.email);

      // Real API Call to Backend
      const response = await register(userData);
      
      console.log('✅ Registration successful:', response);

      // Success
      alert('✅ Account created successfully! Please login now.');
      navigate('/login');
    } catch (err) {
      // Error handling
      console.error('❌ Signup error:', err);

      // User-friendly error messages
      if (err.message) {
        setError(err.message);
      } else if (err.error) {
        setError(err.error);
      } else {
        setError('❌ Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🎯 ToggleNest</h1>
          <h2>Create Account</h2>
          <p>Join your team's workspace</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="member">Team Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
