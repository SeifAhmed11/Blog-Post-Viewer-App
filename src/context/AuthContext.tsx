import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
  loading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          
          const res = await axios.get(`${API_URL}/api/auth/user`, config);
          setUser(res.data);
          setIsAuthenticated(true);
          setIsAdmin(res.data.role === 'admin');
        } catch (err) {
          localStorage.removeItem('token');
          setToken(null);
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      setIsAdmin(res.data.user.role === 'admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setError(null);
      const res = await axios.post(`${API_URL}/api/auth/register`, { name, email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      setIsAdmin(res.data.user.role === 'admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin,
        loading,
        error,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;