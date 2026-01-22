import React, { useState, useEffect } from 'react';
import '../styles/Projects.css';
import projectService from '../services/projectService';
import taskService from '../services/taskService';

const ProjectList = ({ projects, onCreateNew, onEditProject, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

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
    <div>
      <div className="header">
        <h1>Projects</h1>
        <button className="new-project-btn" onClick={onCreateNew}>
          + New Project
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search Project"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card" onClick={() => onEditProject(project)}>
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
        ))}
      </div>
    </div>
  );
};

const ProjectForm = ({ project, mode, onSave, onCancel, onSwitchToList, onSwitchToCreate }) => {
  const [formData, setFormData] = useState({
    name: project?.name || '',
    description: project?.description || '',
    dueDate: project?.dueDate || '',
    teamMembers: project?.teamMembers || []
  });
  
  const [newMemberName, setNewMemberName] = useState('');
  
  const [tasks, setTasks] = useState([
    {
      title: '',
      description: '',
      priority: 'medium',
      status: 'todo',
      assignedTo: '',
      dueDate: ''
    }
  ]);

  React.useEffect(() => {
    setFormData({
      name: project?.name || '',
      description: project?.description || '',
      dueDate: project?.dueDate || '',
      teamMembers: project?.teamMembers || []
    });
    
    if (mode === 'create') {
      setTasks([{
        title: '',
        description: '',
        priority: 'medium',
        status: 'todo',
        dueDate: ''
      }]);
    }
  }, [project, mode]);

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      const member = {
        id: Date.now(),
        name: newMemberName,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
      };
      setFormData({
        ...formData,
        teamMembers: [...formData.teamMembers, member]
      });
      setNewMemberName('');
    }
  };

  const handleRemoveMember = (memberId) => {
    setFormData({
      ...formData,
      teamMembers: formData.teamMembers.filter(m => m.id !== memberId)
    });
  };

  const addTaskField = () => {
    setTasks([
      ...tasks,
      {
        title: '',
        description: '',
        priority: 'medium',
        status: 'todo',
        assignedTo: '',
        dueDate: ''
      }
    ]);
  };

  const removeTaskField = (index) => {
    if (tasks.length > 1) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  };

  const handleSubmit = () => {
    if (formData.name && formData.dueDate) {
      const validTasks = tasks.filter(task => task.title.trim() !== '');
      
      onSave({
        ...formData,
        tasks: validTasks
      });
    }
  };

  return (
    <div>
      <div className="tabs">
        <button 
          className={`tab ${mode === 'edit' ? 'active' : ''}`}
          onClick={onSwitchToList}
        >
          {mode === 'edit' ? `Manage Project: ${project?.name}` : 'Manage Project'}
        </button>
        <button 
          className={`tab ${mode === 'create' ? 'active' : ''}`}
          onClick={onSwitchToCreate}
        >
          Create New Project
        </button>
      </div>

      <div className="form-group">
        <label className="form-label">Project Name:</label>
        <input
          type="text"
          className="form-input"
          placeholder="Enter Project Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description:</label>
        <textarea
          className="form-input"
          placeholder="Enter Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Due Date:</label>
        <div className="date-input-wrapper">
          <input
            type="date"
            className="form-input"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
          <svg className="calendar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Team Members:</label>
        <div className="team-members-section">
          {formData.teamMembers.length > 0 && (
            <div className="team-members-display">
              {formData.teamMembers.map(member => (
                <div key={member.id} className="team-member-chip">
                  <img src={member.avatar} alt={member.name} />
                  <span>{member.name}</span>
                  <button
                    className="remove-member-btn"
                    onClick={() => handleRemoveMember(member.id)}
                    title="Remove member"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="add-member-section">
            <div className="add-member-input">
              <input
                type="text"
                className="form-input"
                placeholder="Name"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddMember()}
              />
            </div>
            <button className="add-member-btn" onClick={handleAddMember}>
              + Add Members
            </button>
          </div>
        </div>
      </div>

      <div className="form-group tasks-section">
        <div className="tasks-header">
          <label className="form-label">Project Tasks:</label>
          <button type="button" className="add-task-field-btn" onClick={addTaskField}>
            + Add Task
          </button>
        </div>

        {tasks.map((task, index) => (
          <div key={index} className="task-input-card">
            <div className="task-card-header">
              <h4>Task {index + 1}</h4>
              {tasks.length > 1 && (
                <button
                  type="button"
                  className="remove-task-btn"
                  onClick={() => removeTaskField(index)}
                >
                  × Remove
                </button>
              )}
            </div>

            <div className="task-fields">
              <div className="form-group">
                <label className="form-label-small">Task Title:</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter task title"
                  value={task.title}
                  onChange={(e) => handleTaskChange(index, 'title', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label-small">Description:</label>
                <textarea
                  className="form-input"
                  placeholder="Enter task description"
                  value={task.description}
                  onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
                  rows="2"
                />
              </div>

              <div className="task-inline-fields">
                <div className="form-group">
                  <label className="form-label-small">Priority:</label>
                  <select
                    className="form-input"
                    value={task.priority}
                    onChange={(e) => handleTaskChange(index, 'priority', e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label-small">Assign To:</label>
                  <select
                    className="form-input"
                    value={task.assignedTo || ''}
                    onChange={(e) => handleTaskChange(index, 'assignedTo', e.target.value)}
                  >
                    <option value="">Unassigned</option>
                    {formData.teamMembers.map(member => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label-small">Status:</label>
                  <select
                    className="form-input"
                    value={task.status}
                    onChange={(e) => handleTaskChange(index, 'status', e.target.value)}
                  >
                    <option value="backlog">Backlog</option>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label-small">Due Date:</label>
                  <input
                    type="date"
                    className="form-input"
                    value={task.dueDate}
                    onChange={(e) => handleTaskChange(index, 'dueDate', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="form-actions">
        {mode === 'edit' && (
          <button className="btn btn-secondary" onClick={handleSubmit}>
            Save Changes
          </button>
        )}
        {mode === 'create' && (
          <button className="btn btn-primary" onClick={handleSubmit}>
            Create Project
          </button>
        )}
        <button className="btn btn-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const Projects = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjectsFromDB();
  }, []);

  const fetchProjectsFromDB = async () => {
    try {
      console.log('🔄 Fetching projects from MongoDB...');
      const response = await projectService.getAllProjects();
      console.log('📦 MongoDB Response:', response);

      if (response.success && response.data && response.data.length > 0) {
        const transformedProjects = response.data.map(project => ({
          id: project._id,
          _id: project._id,
          name: project.title,
          description: project.description,
          assignedDate: new Date(project.createdAt).toISOString().split('T')[0],
          tasksCount: project.taskCount || 0,
          completedTasks: 0,
          dueDate: project.deadline ? new Date(project.deadline).toISOString().split('T')[0] : 'N/A',
          teamMembers: project.members || []
        }));

        console.log('✅ Fetched projects:', transformedProjects);
        setProjects(transformedProjects);
      }
    } catch (error) {
      console.error('❌ Error fetching projects:', error);
    }
  };

  const handleCreateNew = () => {
    setSelectedProject(null);
    setCurrentView('create');
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setCurrentView('edit');
  };

  const handleSaveProject = async (formData) => {
    try {
      console.log('💾 Form Data:', formData);

      if (!formData.name || !formData.dueDate) {
        alert('❌ Please fill Project Name and Due Date!');
        return;
      }

      // Don't send members array if empty, backend expects ObjectIds
      const backendData = {
        title: formData.name,
        description: formData.description,
        deadline: formData.dueDate,
        priority: 'medium',
        status: 'active'
      };

      // Only add members if there are any (backend needs to handle member registration separately)
      if (formData.teamMembers && formData.teamMembers.length > 0) {
        // Backend expects array of User ObjectIds, not objects
        // For now, we'll skip members in project creation
        console.log('⚠️ Team members will need to be added separately:', formData.teamMembers);
      }

      console.log('📤 Backend Data:', backendData);

      if (currentView === 'create') {
        console.log('🚀 Creating project...');
        const response = await projectService.createProject(backendData);
        console.log('✅ Project created:', response);

        if (response.success) {
          const projectId = response.data._id;
          console.log('📝 Project ID:', projectId);

          if (formData.tasks && formData.tasks.length > 0) {
            console.log(`📋 Creating ${formData.tasks.length} tasks`);
            
            for (const task of formData.tasks) {
              if (!task.title || task.title.trim() === '') {
                console.log('⏭️ Skipping empty task');
                continue;
              }

              try {
                console.log('📝 Creating task:', task.title);
                
                const taskPayload = {
                  title: task.title,
                  description: task.description || '',
                  project: projectId,
                  priority: task.priority || 'medium',
                  status: task.status || 'todo',
                  stage: 'planning'
                };

                if (task.dueDate) {
                  taskPayload.dueDate = task.dueDate;
                }

                
                console.log('📤 Task Payload:', taskPayload);
                
                const taskResponse = await taskService.createTask(taskPayload);
                console.log('✅ Task created:', taskResponse);
              } catch (taskError) {
                console.error('❌ Task creation failed:', taskError);
                console.error('❌ Task error response:', taskError.response?.data);
              }
            }
          }

          alert('✅ Project created successfully!');
          await fetchProjectsFromDB();
          setCurrentView('list');
          setSelectedProject(null);
        }
      }

    } catch (error) {
      console.error('❌ Full Error Object:', error);
      console.error('❌ Error Response:', error.response);
      console.error('❌ Error Data:', error.response?.data);
      
      const errorMsg = error.response?.data?.error || error.response?.data?.message || error.message;
      alert('❌ Failed to save: ' + errorMsg);
    }
  };

  const handleCancel = () => {
    setCurrentView('list');
    setSelectedProject(null);
  };

  const handleSearch = (searchTerm) => {
    // Search functionality handled within ProjectList component
  };

  const handleSwitchToList = () => {
    setCurrentView('list');
    setSelectedProject(null);
  };

  const handleSwitchToCreate = () => {
    setCurrentView('create');
    setSelectedProject(null);
  };

  if (currentView === 'list') {
    return (
      <ProjectList
        projects={projects}
        onCreateNew={handleCreateNew}
        onEditProject={handleEditProject}
        onSearch={handleSearch}
      />
    );
  }

  return (
    <ProjectForm
      project={selectedProject}
      mode={currentView}
      onSave={handleSaveProject}
      onCancel={handleCancel}
      onSwitchToList={handleSwitchToList}
      onSwitchToCreate={handleSwitchToCreate}
    />
  );
};

export default Projects;