import React from 'react';

const TaskCard = ({ task, index, onClick, getInitials, getPriorityColor }) => {
  return (
    <div
      className="task-row"
      onClick={onClick}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="task-cell col-task">
        <div className="task-checkbox"></div>
        <span className="task-name">{task.name}</span>
      </div>
      <div className="task-cell col-project">
        <span className="project-badge">{task.project}</span>
      </div>
      <div className="task-cell col-assignee">
        <div className="avatar">{getInitials(task.assignee)}</div>
        <span>{task.assignee}</span>
      </div>
      <div className="task-cell col-date">{task.dueDate}</div>
      <div className="task-cell col-priority">
        <span 
          className="priority-badge" 
          style={{ 
            backgroundColor: getPriorityColor(task.priority) + '20', 
            color: getPriorityColor(task.priority) 
          }}
        >
          {task.priority}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;