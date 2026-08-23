import { createContext, useContext, useState } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [username, setUsername] = useState(localStorage.getItem('admin_username'));

  async function login(u, p) {
    const data = await api.login(u, p);
    localStorage.setItem('admin_token', data.token);
    localStorage.setItem('admin_username', data.username);
    setToken(data.token);
    setUsername(data.username);
  }

  function logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    setToken(null);
    setUsername(null);
  }

  return (
    <AuthContext.Provider value={{ token, username, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
