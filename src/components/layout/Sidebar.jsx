import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/Layout.css';

const Sidebar = () => {
    const menuItems = [
        { path: '/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/projects', icon: '📁', label: 'Projects' },
        { path: '/tasks', icon: '✓', label: 'Tasks' },
        { path: '/kanban', icon: '📋', label: 'Kanban Board' }
  ];

  return (
    <aside className="sidebar">
        <div className="sidebar-header">
            <h3> Menu</h3>
        </div>

        <nav className="sidebar-nav">
            {menuItems.map((item) => (
                <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                isActive ? 'sidebar-link active' : 'sidebar-link'
            }
            >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
            </NavLink>
            ))}
        </nav>

        
    </aside>
  );
};

export default Sidebar;