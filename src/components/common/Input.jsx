import React from 'react';
import '../styles/Common.css';

const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  name,
  error,
  required = false,
  disabled = false,
  icon = null,
  className = '',
  ...props
}) => {
  const inputClass = `custom-input ${error ? 'input-error' : ''} ${icon ? 'input-with-icon' : ''} ${className}`.trim();

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}
      
      <div className="input-container">
        {icon && <span className="input-icon">{icon}</span>}
        
        <input
          type={type}
          className={inputClass}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
          required={required}
          {...props}
        />
      </div>

      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};

export default Input;

