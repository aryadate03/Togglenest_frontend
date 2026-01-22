
import React from 'react';

const ActivityLog = ({ activities }) => {
  return (
    <div className="activity-log">
      <h3>Recent Activity</h3>
      <ul>
        {activities.map((a) => (
          <li key={a._id}>
            <b>{a.user?.name}</b> {a.action} 
            {a.project && <> in <i>{a.project.title}</i></>}
            {a.task && <> for task <i>{a.task.title}</i></>}
            <span> ({new Date(a.createdAt).toLocaleString()})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ActivityLog;