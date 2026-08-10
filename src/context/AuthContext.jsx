import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check localStorage on load to persist login
  useEffect(() => {
    const storedUser = localStorage.getItem('maay_auth');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // Check specific admin credentials
    const isAdmin = userData.email === 'adminmaayrooftop@gmail.com' && userData.password === 'admin123';
    
    // For mock, just save the object
    const mockUser = {
      name: userData.name || userData.email.split('@')[0],
      email: userData.email,
      role: isAdmin ? 'admin' : 'customer',
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('maay_auth', JSON.stringify(mockUser));
    
    return mockUser; // Return user so callers know the role immediately
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('maay_auth');
  };

  if (loading) return null; // Wait for localStorage check

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
