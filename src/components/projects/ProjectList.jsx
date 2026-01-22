import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectFilters from './ProjectFilters';

const ProjectList = ({ projects, onCreateNew, onEditProject }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="header">
        <h1>Projects</h1>
        <button className="new-project-btn" onClick={onCreateNew}>
          + New Project
        </button>
      </div>

      <ProjectFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project.id}
            project={project}
            onClick={() => onEditProject(project)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;