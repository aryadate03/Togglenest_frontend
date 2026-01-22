import React, { useState } from 'react';
import taskService from '../../services/taskService';

const CreateTaskForm = ({ onSave, onCancel, projects = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    project: '',
    assignee: '',
    dueDate: '',
    priority: 'Medium',
    status: 'To Do',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Task name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Task name must be at least 3 characters';
    }

    if (!formData.project) {
      newErrors.project = 'Please select a project';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    if (formData.assignee && formData.assignee.length < 2) {
      newErrors.assignee = 'Assignee name must be at least 2 characters';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Call API to create task
      const response = await taskService.createTask(formData);
      
      console.log('Task created successfully:', response);
      
      // Call parent callback with response data
      onSave(response);
      
    } catch (error) {
      console.error('Error creating task:', error);
      
      if (error.response) {
        setApiError(error.response.data.message || 'Failed to create task');
      } else if (error.request) {
        setApiError('Network error. Please check your connection.');
      } else {
        setApiError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Create New Task</h2>
      </div>

      {apiError && (
        <div className="error-banner">
          <span className="error-icon">⚠️</span>
          <span>{apiError}</span>
          <button onClick={() => setApiError('')} className="error-close">×</button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Task Name: <span className="required">*</span>
          </label>
          <input
            type="text"
            className={`form-input ${errors.name ? 'input-error' : ''}`}
            placeholder="Enter task name"
            value={formData.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            disabled={isLoading}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea
            className={`form-input ${errors.description ? 'input-error' : ''}`}
            placeholder="Enter task description"
            rows="4"
            value={formData.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            disabled={isLoading}
          />
          <div className="char-count">
            {formData.description.length}/500 characters
          </div>
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              Project: <span className="required">*</span>
            </label>
            <select
              className={`form-input ${errors.project ? 'input-error' : ''}`}
              value={formData.project}
              onChange={(e) => handleFieldChange('project', e.target.value)}
              disabled={isLoading}
            >
              <option value="">Select Project</option>
              {projects.map(project => (
                <option key={project.id} value={project.name}>
                  {project.name}
                </option>
              ))}
            </select>
            {errors.project && <span className="error-message">{errors.project}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Assignee:</label>
            <input
              type="text"
              className={`form-input ${errors.assignee ? 'input-error' : ''}`}
              placeholder="Enter assignee name"
              value={formData.assignee}
              onChange={(e) => handleFieldChange('assignee', e.target.value)}
              disabled={isLoading}
            />
            {errors.assignee && <span className="error-message">{errors.assignee}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              Due Date: <span className="required">*</span>
            </label>
            <input
              type="date"
              className={`form-input ${errors.dueDate ? 'input-error' : ''}`}
              value={formData.dueDate}
              onChange={(e) => handleFieldChange('dueDate', e.target.value)}
              disabled={isLoading}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Priority:</label>
            <select
              className="form-input"
              value={formData.priority}
              onChange={(e) => handleFieldChange('priority', e.target.value)}
              disabled={isLoading}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Status:</label>
          <select
            className="form-input"
            value={formData.status}
            onChange={(e) => handleFieldChange('status', e.target.value)}
            disabled={isLoading}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Creating...
              </>
            ) : (
              'Create Task'
            )}
          </button>
          <button 
            type="button" 
            className="btn btn-cancel" 
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskForm;