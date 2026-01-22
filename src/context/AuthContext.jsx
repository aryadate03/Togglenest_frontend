import React, { createContext, useState, useEffect, useContext } from 'react';
import { getToken, getUser } from '../utils/localStorage';

const AuthContext = createContext();

// Provider component - Sabko data provide karega
export const AuthProvider = ({ children }) =>{
    // State variables
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setloaading] = useState(true);

    // Component load hone pe check karo user logged in hai ya nahi
    useEffect(() => {
        const token = getToken();
        const userData = getUser();

        if (token && userData) {
            // Token aur user data hai, matlab logged in hai
            setUser(userData);
            setIsAuthenticated(true);
        }

        setloaading(false);

    }, []);

     // Value object - ye sab components ko milega
    const value = {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook - Easy access to context
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error ('useAuth must be used within AuthProvider');
    }

    return context;
};