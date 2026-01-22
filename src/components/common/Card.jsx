import React from 'react';
import '../styles/Common.css';

const Card = ({
  children,
  title,
  subtitle,
  footer,
  onClick,
  hoverable = false,
  bordered = true,
  className = '',
  style = {}
}) => {
  const cardClass = `custom-card ${hoverable ? 'card-hoverable' : ''} ${bordered ? 'card-bordered' : ''} ${onClick ? 'card-clickable' : ''} ${className}`.trim();

  return (
    <div className={cardClass} onClick={onClick} style={style}>
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}

      <div className="card-body">
        {children}
      </div>

      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};


export const CardGrid = ({ children, columns = 3, gap = '20px', className = '' }) => {
  return (
    <div 
      className={`card-grid ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: gap
      }}
    >
      {children}
    </div>
  );
};

export default Card;

