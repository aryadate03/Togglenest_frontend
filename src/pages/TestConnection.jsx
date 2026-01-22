import { useState, useEffect } from 'react';
import { getProjects } from '../services/api';

function TestConnection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        console.log('Projects:', data);
        setProjects(data.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div style={{padding: '20px'}}>Loading projects...</div>;
  }

  if (error) {
    return <div style={{padding: '20px', color: 'red'}}>Error: {error}</div>;
  }

  return (
    <div style={{padding: '20px'}}>
      <h1>🎯 ToggleNest Projects</h1>
      <p>Total Projects: {projects.length}</p>
      
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div>
          {projects.map(project => (
            <div key={project._id} style={{
              border: '1px solid #ddd',
              padding: '15px',
              margin: '10px 0',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            }}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                <span style={{
                  padding: '4px 8px',
                  backgroundColor: project.status === 'active' ? '#4CAF50' : '#999',
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  {project.status}
                </span>
                <span style={{
                  padding: '4px 8px',
                  backgroundColor: project.priority === 'high' ? '#f44336' : '#FF9800',
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  {project.priority}
                </span>
              </div>
              <p style={{fontSize: '12px', color: '#666', marginTop: '10px'}}>
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TestConnection;