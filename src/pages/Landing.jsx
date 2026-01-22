import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';

const Landing = () => {
  const features = [
    {
      icon: '📊',
      title: 'Project Management',
      description: 'Organize and track your projects efficiently with our intuitive dashboard.'
    },
    {
      icon: '✅',
      title: 'Task Tracking',
      description: 'Create, assign, and monitor tasks to keep your team on schedule.'
    },
    {
      icon: '👥',
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time updates and team features.'
    },
    {
      icon: '📈',
      title: 'Analytics',
      description: 'Get insights into your team productivity and project progress.'
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Manage Your Projects <span className="highlight">Effortlessly</span>
          </h1>
          <p className="hero-subtitle">
            ToggleNest helps teams collaborate, track progress, and deliver projects on time.
            Everything you need in one powerful platform.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary btn-large">
              Get Started Free
            </Link>
            <Link to="/about" className="btn btn-outline btn-large">
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">
            <svg viewBox="0 0 400 300" fill="none">
              <rect x="50" y="50" width="300" height="200" rx="10" fill="#4F46E5" opacity="0.1"/>
              <rect x="80" y="80" width="80" height="60" rx="5" fill="#4F46E5"/>
              <rect x="180" y="80" width="80" height="60" rx="5" fill="#8B5CF6"/>
              <rect x="280" y="80" width="80" height="60" rx="5" fill="#EC4899"/>
              <rect x="80" y="160" width="240" height="40" rx="5" fill="#4F46E5" opacity="0.3"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-subtitle">Everything you need to manage projects successfully</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <h3 className="stat-number">10K+</h3>
            <p className="stat-label">Active Users</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">50K+</h3>
            <p className="stat-label">Projects Completed</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">99.9%</h3>
            <p className="stat-label">Uptime</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">24/7</h3>
            <p className="stat-label">Support</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-subtitle">Join thousands of teams already using ToggleNest</p>
          <Link to="/signup" className="btn btn-primary btn-large">
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>ToggleNest</h3>
            <p>Making project management simple and effective.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <Link to="/features">Features</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/about">About</Link>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/careers">Careers</Link>
            </div>
            <div className="footer-column">
              <h4>Support</h4>
              <Link to="/help">Help Center</Link>
              <Link to="/docs">Documentation</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 ToggleNest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;