import React from 'react';
import '../styles/Common.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  type = 'button',
  disabled = false,
  fullWidth = false,
  icon = null,
  className = ''
}) => {
  const baseClass = 'custom-button';
  const variantClass = `button-${variant}`;
  const sizeClass = `button-${size}`;
  const widthClass = fullWidth ? 'button-full' : '';
  const disabledClass = disabled ? 'button-disabled' : '';

  const buttonClass = `${baseClass} ${variantClass} ${sizeClass} ${widthClass} ${disabledClass} ${className}`.trim();

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-text">{children}</span>
    </button>
  );
};

export default Button;

