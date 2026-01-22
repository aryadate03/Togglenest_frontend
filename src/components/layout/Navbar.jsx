import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Layout.css';

const Navbar = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                <h2> ToggleNest</h2>
                </Link>

                <div className="navbar-menu">
                    {isAuthenticated ? (
                        <>
                        <Link to="/dashboard" className="nav=link">Dashboard</Link>
                        <Link to="/projects" className="nav=link">Projects</Link>
                        <Link to="/tasks" className="nav=link">Tasks</Link>
                        <Link to="/kanban" className="nav=link">kanban</Link>

                        <div className="nav-user">
                            <span className="user-name">{user?.name || 'User'}</span>
                            <button onClick={handleLogout} className="btn-logout">
                                Logout
                            </button>
                        </div>
                        </>
                    ) : (
                        <>
                         <Link to="/about" className="nav-link">About</Link>
                         <Link to="/login" className="nav-link">Login</Link>
                         <Link to="/signup" className="btn-signup">Sign Up</Link>
                        </>
                    )}
                </div>

            </div>
        </nav>
    )
};

export default Navbar;