
import React, { useState, useEffect } from 'react';
import projectService from '../../services/projectService';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  return (
    <div className="manage-projects">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Project"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredProjects.length === 0 ? (
        <div className="no-projects">
          <p>No projects found. Create your first project!</p>
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project._id} className="project-card">
              <div className="project-icon">📁</div>
              <div className="project-info">
                <h3>{project.name}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-meta">
                  <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                  <span>{project.teamMembers?.length || 0} members</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageProjects;