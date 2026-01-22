import React from 'react';

const ProjectCard = ({ project, onClick }) => {
  const getTeamAvatars = (teamMembers) => {
    return teamMembers.slice(0, 3).map((member, index) => (
      <img
        key={member.id}
        src={member.avatar}
        alt={member.name}
        className="team-avatar"
        style={{
          zIndex: teamMembers.length - index
        }}
        title={member.name}
      />
    ));
  };

  return (
    <div className="project-card" onClick={onClick}>
      <div className="project-header">
        <div className="project-icon"></div>
        <div className="project-info">
          <div className="project-name">{project.name}</div>
          <span className="assigned-date">Assigned on {project.assignedDate}</span>
        </div>
      </div>

      <div className="divider"></div>

      <div className="project-footer">
        <div className="tasks-info">
          <div className="tasks-count">
            {project.completedTasks}/{project.tasksCount} Tasks
          </div>
          <div className="due-date">Due: {project.dueDate}</div>
        </div>
        <div className="progress-circles">
          {getTeamAvatars(project.teamMembers)}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;