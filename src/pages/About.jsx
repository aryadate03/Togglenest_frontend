import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://i.pravatar.cc/150?img=1',
      bio: 'Passionate about building tools that empower teams.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://i.pravatar.cc/150?img=2',
      bio: 'Tech enthusiast with 15+ years in software development.'
    },
    {
      name: 'Emily Davis',
      role: 'Head of Design',
      image: 'https://i.pravatar.cc/150?img=3',
      bio: 'Creating beautiful and intuitive user experiences.'
    },
    {
      name: 'David Wilson',
      role: 'Head of Product',
      image: 'https://i.pravatar.cc/150?img=4',
      bio: 'Focused on delivering value to our customers.'
    }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Mission Driven',
      description: 'We are committed to helping teams work better together and achieve their goals.'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'Constantly improving and adapting to meet the evolving needs of modern teams.'
    },
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and building strong partnerships.'
    },
    {
      icon: '🚀',
      title: 'Excellence',
      description: 'Striving for excellence in everything we do, from product to support.'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">About ToggleNest</h1>
          <p className="hero-description">
            We're on a mission to make project management simple, efficient, and accessible for teams of all sizes.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="content-wrapper">
          <div className="story-text">
            <h2>Our Story</h2>
            <p>
              ToggleNest was founded in 2020 with a simple idea: project management shouldn't be complicated. 
              We saw teams struggling with bloated, complex tools that got in the way of actual work.
            </p>
            <p>
              Our founders, who had spent years managing projects across various industries, decided to build 
              something different. Something that would actually help teams collaborate and deliver results.
            </p>
            <p>
              Today, ToggleNest is used by over 10,000 teams worldwide, from startups to enterprises, 
              helping them plan, track, and complete projects more effectively.
            </p>
          </div>
          <div className="story-image">
            <div className="image-placeholder">
              <svg viewBox="0 0 400 300" fill="none">
                <circle cx="100" cy="150" r="60" fill="#4F46E5" opacity="0.2"/>
                <circle cx="200" cy="150" r="60" fill="#8B5CF6" opacity="0.2"/>
                <circle cx="300" cy="150" r="60" fill="#EC4899" opacity="0.2"/>
                <circle cx="150" cy="80" r="40" fill="#4F46E5"/>
                <circle cx="250" cy="80" r="40" fill="#EC4899"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="section-header">
          <h2>Our Values</h2>
          <p>The principles that guide everything we do</p>
        </div>
        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-header">
          <h2>Meet Our Team</h2>
          <p>The talented people behind ToggleNest</p>
        </div>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <img src={member.image} alt={member.name} className="team-image" />
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>2020</h3>
            <p>Founded</p>
          </div>
          <div className="stat-card">
            <h3>10,000+</h3>
            <p>Active Teams</p>
          </div>
          <div className="stat-card">
            <h3>50+</h3>
            <p>Countries</p>
          </div>
          <div className="stat-card">
            <h3>4.9/5</h3>
            <p>User Rating</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="cta-content">
          <h2>Join Us on Our Journey</h2>
          <p>Start managing your projects better today</p>
          <Link to="/signup" className="btn btn-primary btn-large">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;