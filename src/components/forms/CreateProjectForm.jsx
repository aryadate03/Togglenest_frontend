import React, { useState } from 'react';
import projectService from '../../services/projectService';

const CreateProjectForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dueDate: '',
    teamMembers: []
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
    } else {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
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

  console.log('================================');
  console.log('🎯 FORM SUBMIT CLICKED');
  console.log('================================');
  console.log('📋 Form Data:', formData);

  // Validate form
  if (!validateForm()) {
    console.log('❌ VALIDATION FAILED');
    console.log('Errors:', errors);
    alert('❌ Validation failed! Fill all required fields.');
    return;
  }

  console.log('✅ VALIDATION PASSED');
  console.log('🚀 Starting API call...');
  
  setIsLoading(true);

  try {
    console.log('📞 Calling API...');
    console.log('📦 Data being sent:', formData);
    
    const response = await projectService.createProject(formData);
    
    console.log('✅ API SUCCESS!');
    console.log('📨 Response:', response);
    
    alert('✅ Project created successfully!');
    onSave(response);
    
  } catch (error) {
    console.log('❌ API FAILED!');
    console.error('❌ Full Error:', error);
    console.error('❌ Error Message:', error.message);
    
    if (error.response) {
      console.log('🔴 Server Error:', error.response.data);
      setApiError(error.response.data.message || 'Failed to create project');
      alert('❌ Server Error: ' + (error.response.data.message || 'Failed'));
    } else if (error.request) {
      console.log('🔴 Network Error - Backend not reachable');
      setApiError('Network error. Backend not reachable!');
      alert('❌ Network Error: Is backend running?');
    } else {
      console.log('🔴 Other Error:', error.message);
      setApiError('An unexpected error occurred');
      alert('❌ Error: ' + error.message);
    }
  } finally {
    setIsLoading(false);
    console.log('================================');
    console.log('🏁 SUBMIT ENDED');
    console.log('================================');
  }
};

  // Real-time validation on field change
  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div>
      <div className="tabs">
        <button className="tab active">
          Create New Project
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
              min={new Date().toISOString().split('T')[0]}
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
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Creating...
              </>
            ) : (
              'Create Project'
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

export default CreateProjectForm;