import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onTaskClick }) => {
  
  const getInitials = (name) => {
    if (!name || name === 'Unassigned') return 'NA';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  // ✅ Show message if no tasks
  if (tasks.length === 0) {
    return (
      <div className="no-tasks-message">
        <p>No tasks found</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <div className="col-task">Task</div>
        <div className="col-project">Project</div>
        <div className="col-assignee">Assignee</div>
        <div className="col-date">Due Date</div>
        <div className="col-priority">Priority</div>
      </div>

      <div className="task-list">
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            index={index}
            onClick={() => onTaskClick(task)}
            getInitials={getInitials}
            getPriorityColor={getPriorityColor}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;