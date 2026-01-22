import React, { useState } from 'react';
import projectService from '../../services/projectService';

const EditProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: project?.name || '',
    description: project?.description || '',
    dueDate: project?.dueDate || '',
    teamMembers: project?.teamMembers || []
  });
  const [newMemberName, setNewMemberName] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Project name must be at least 3 characters';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      if (newMemberName.length < 2) {
        setErrors({ ...errors, teamMember: 'Name must be at least 2 characters' });
        return;
      }

      const member = {
        id: Date.now(),
        name: newMemberName.trim(),
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
      };
      setFormData({
        ...formData,
        teamMembers: [...formData.teamMembers, member]
      });
      setNewMemberName('');
      setErrors({ ...errors, teamMember: '' });
    }
  };

  const handleRemoveMember = (memberId) => {
    setFormData({
      ...formData,
      teamMembers: formData.teamMembers.filter(m => m.id !== memberId)
    });
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
      // Call API to update project
      const response = await projectService.updateProject(project.id, formData);
      
      console.log('Project updated successfully:', response);
      
      // Call parent callback with response data
      onSave(response);
      
    } catch (error) {
      console.error('Error updating project:', error);
      
      if (error.response) {
        setApiError(error.response.data.message || 'Failed to update project');
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
    <div>
      <div className="tabs">
        <button className="tab active">
          Manage Project: {project?.name}
        </button>
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
            Project Name: <span className="required">*</span>
          </label>
          <input
            type="text"
            className={`form-input ${errors.name ? 'input-error' : ''}`}
            placeholder="Enter Project Name"
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
            placeholder="Enter Description"
            value={formData.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            disabled={isLoading}
            rows="4"
          />
          <div className="char-count">
            {formData.description.length}/500 characters
          </div>
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">
            Due Date: <span className="required">*</span>
          </label>
          <div className="date-input-wrapper">
            <input
              type="date"
              className={`form-input ${errors.dueDate ? 'input-error' : ''}`}
              value={formData.dueDate}
              onChange={(e) => handleFieldChange('dueDate', e.target.value)}
              disabled={isLoading}
            />
            <svg className="calendar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
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
                      type="button"
                      className="remove-member-btn"
                      onClick={() => handleRemoveMember(member.id)}
                      title="Remove member"
                      disabled={isLoading}
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
                  className={`form-input ${errors.teamMember ? 'input-error' : ''}`}
                  placeholder="Name"
                  value={newMemberName}
                  onChange={(e) => {
                    setNewMemberName(e.target.value);
                    if (errors.teamMember) {
                      setErrors({ ...errors, teamMember: '' });
                    }
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMember())}
                  disabled={isLoading}
                />
              </div>
              <button 
                type="button"
                className="add-member-btn" 
                onClick={handleAddMember}
                disabled={isLoading}
              >
                + Add Members
              </button>
            </div>
            {errors.teamMember && <span className="error-message">{errors.teamMember}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-secondary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Saving...
              </>
            ) : (
              'Save Changes'
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

export default EditProjectForm;