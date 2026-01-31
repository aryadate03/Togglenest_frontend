import React, { useState, useEffect } from 'react';
import TaskList from '../components/tasks/TaskList';
import TaskFilters from '../components/tasks/TaskFilters';
import * as projectService from '../services/projectService';  // ✅ Fixed path
import * as taskService from '../services/taskService'; 
import '../styles/Tasks.css';

const Tasks = () => {
  const [activeFilter, setActiveFilter] = useState('All Tasks');
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project: '',
    assignedTo: '',
    dueDate: '',
    priority: 'medium',
    status: 'todo',
    stage: 'planning'
  });

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasks();
      
      console.log('✅ Raw Tasks from API:', response.data);
      
      const transformedTasks = response.data.map(task => {
        return {
          id: task._id,
          _id: task._id,
          name: task.title,
          project: task.project?.title || 'No Project',
          projectId: task.project?._id,
          assignee: task.assignedTo?.name || null,
          assigneeId: task.assignedTo?._id,
          dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : 'No Date',
          priority: task.priority.charAt(0).toUpperCase() + task.priority.slice(1),
          status: task.status,
          stage: task.stage || 'planning',
          description: task.description || '',
          displayStatus: task.status === 'todo' ? 'To Do' : 
            task.status === 'in-progress' ? 'In Progress' : 'Done'
        };
      });
      
      console.log('✅ Transformed Tasks:', transformedTasks);
      setTasks(transformedTasks);
      setError('');
    } catch (err) {
      console.error('❌ Error fetching tasks:', err);
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await projectService.getProjects();
      if (response.success && response.data) {
        setProjects(response.data);
        
        const allMembers = [];
        response.data.forEach(project => {
          if (project.members && project.members.length > 0) {
            project.members.forEach(member => {
              if (!allMembers.find(m => m._id === member._id)) {
                allMembers.push(member);
              }
            });
          }
        });
        setTeamMembers(allMembers);
        console.log('✅ Team Members:', allMembers);
      }
    } catch (err) {
      console.error('❌ Error fetching projects:', err);
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsEditing(false);
  };

  const closePopup = () => {
    setSelectedTask(null);
    setIsEditing(false);
    setIsCreating(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      project: '',
      assignedTo: '',
      dueDate: '',
      priority: 'medium',
      status: 'todo',
      stage: 'planning'
    });
  };

  const handleEditClick = () => {
    setFormData({
      title: selectedTask.name,
      description: selectedTask.description || '',
      project: selectedTask.projectId || '',
      assignedTo: selectedTask.assigneeId || '',
      dueDate: selectedTask.dueDate !== 'No Date' ? selectedTask.dueDate : '',
      priority: selectedTask.priority.toLowerCase(),
      status: selectedTask.status,
      stage: selectedTask.stage || 'planning'
    });
    setIsEditing(true);
  };

  const handleNewTask = () => {
    resetForm();
    setSelectedTask(null);
    setIsCreating(true);
  };

  const handleSaveTask = async () => {
    try {
      if (!formData.title || !formData.project) {
        alert('❌ Please fill in Task Title and Project!');
        return;
      }

      const taskData = {
        title: formData.title,
        description: formData.description,
        project: formData.project,
        assignedTo: formData.assignedTo || null,
        dueDate: formData.dueDate,
        priority: formData.priority,
        status: formData.status,
        stage: formData.stage
      };

      if (isCreating) {
        const response = await taskService.createTask(taskData);
        console.log('✅ Create response:', response);
        alert('✅ Task created successfully!');
        await fetchTasks();
        closePopup();
      } else if (isEditing && selectedTask) {
        const response = await taskService.updateTask(selectedTask._id, taskData);
        console.log('✅ Update response:', response);
        alert('✅ Task updated successfully!');
        await fetchTasks();
        closePopup();
      }
    } catch (error) {
      console.error('❌ Error saving task:', error);
      console.error('❌ Error details:', error.response?.data);
      alert('❌ Failed to save task: ' + (error.response?.data?.message || error.message));
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      activeFilter === 'All Tasks' ? true :
      activeFilter === 'To Do' ? task.status === 'todo' :
      activeFilter === 'In Progress' ? task.status === 'in-progress' :
      activeFilter === 'Done' ? task.status === 'done' : true;
    
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div>
        <div className="header">
          <h1 className="title">My Tasks</h1>
        </div>
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          Loading tasks...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="header">
          <h1 className="title">My Tasks</h1>
        </div>
        <div style={{ textAlign: 'center', padding: '3rem', color: '#ef4444' }}>
          {error}
          <br />
          <button onClick={fetchTasks} style={{ marginTop: '1rem' }}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="header">
          <h1 className="title">My Tasks</h1>
          <div className="header-actions">
            <button className="add-task-btn" onClick={handleNewTask}>+ New Task</button>
          </div>
        </div>

        <TaskFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <TaskList
          tasks={filteredTasks}
          onTaskClick={handleTaskClick}
        />
      </div>

      {/* Task Details Popup (View Mode) */}
      {selectedTask && !isEditing && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Task Details</h2>
              <button className="close-icon" onClick={closePopup}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="popup-details">
              <div className="detail-row">
                <span className="detail-label">Task Name</span>
                <span className="detail-value">{selectedTask.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Project</span>
                <span className="project-badge">{selectedTask.project}</span>
              </div>
              {selectedTask.assignee && (
                <div className="detail-row">
                  <span className="detail-label">Assignee</span>
                  <div className="assignee-info">
                    <div className="avatar">{getInitials(selectedTask.assignee)}</div>
                    <span>{selectedTask.assignee}</span>
                  </div>
                </div>
              )}
              <div className="detail-row">
                <span className="detail-label">Due Date</span>
                <span className="detail-value">{selectedTask.dueDate}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Priority</span>
                <span className="priority-badge" style={{ 
                  backgroundColor: getPriorityColor(selectedTask.priority) + '20', 
                  color: getPriorityColor(selectedTask.priority) 
                }}>
                  {selectedTask.priority}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status</span>
                <span className="status-badge">{selectedTask.displayStatus}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Stage</span>
                <span className="status-badge">{selectedTask.stage}</span>
              </div>
            </div>
            <div className="popup-actions">
              <button className="btn-secondary close-btn" onClick={closePopup}>Close</button>
              <button className="btn-primary edit-btn" onClick={handleEditClick}>Edit Task</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Create Task Popup (Form Mode) */}
      {(isEditing || isCreating) && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>{isCreating ? 'Create New Task' : 'Edit Task'}</h2>
              <button className="close-icon" onClick={closePopup}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            
            <div className="popup-details">
              <div className="detail-row">
                <span className="detail-label">Task Title *</span>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter task title"
                />
              </div>

              <div className="detail-row">
                <span className="detail-label">Description</span>
                <textarea
                  className="form-input"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter description"
                  rows="3"
                />
              </div>

              <div className="detail-row">
                <span className="detail-label">Project *</span>
                <select
                  className="form-input"
                  value={formData.project}
                  onChange={(e) => setFormData({...formData, project: e.target.value})}
                >
                  <option value="">Select Project</option>
                  {projects.map(project => (
                    <option key={project._id} value={project._id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="detail-row">
                <span className="detail-label">Assign To</span>
                <select
                  className="form-input"
                  value={formData.assignedTo}
                  onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                >
                  <option value="">Unassigned</option>
                  {teamMembers.map(member => (
                    <option key={member._id} value={member._id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="detail-row">
                <span className="detail-label">Due Date</span>
                <input
                  type="date"
                  className="form-input"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                />
              </div>

              <div className="detail-row">
                <span className="detail-label">Priority</span>
                <select
                  className="form-input"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="detail-row">
                <span className="detail-label">Status</span>
                <select
                  className="form-input"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>

              <div className="detail-row">
                <span className="detail-label">Stage</span>
                <select
                  className="form-input"
                  value={formData.stage}
                  onChange={(e) => setFormData({...formData, stage: e.target.value})}
                >
                  <option value="planning">Planning</option>
                  <option value="development">Development</option>
                  <option value="testing">Testing</option>
                  <option value="deployment">Deployment</option>
                </select>
              </div>
            </div>

            <div className="popup-actions">
              <button className="btn-secondary close-btn" onClick={closePopup}>Cancel</button>
              <button className="btn-primary edit-btn" onClick={handleSaveTask}>
                {isCreating ? 'Create Task' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
