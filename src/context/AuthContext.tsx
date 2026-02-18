import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const API_BASE = 'https://jaliconnect-backend.onrender.com';

interface User {
  id: string;
  email: string;
  username: string;
  // add other fields as returned by your backend
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user from token on mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log('Token from localStorage:', token);
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log('Decoded JWT:', decoded)
      const user = decoded.userInfo
      const userId = user.user_id
      console.log('User ID from token:', userId);
      axios
        .get(`${API_BASE}/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data); // adjust based on your response
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    console.log('Attempting login with:', { username, password });
    try {
      const response = await axios.post(`${API_BASE}/api/auth/login/user`, { username, password });
      const { accessToken } = response.data;
      console.log('Received access token:', accessToken);
      
      if (!accessToken) {
        throw new Error('No access token received from server');
      }
      
      localStorage.setItem('accessToken', accessToken);
      
      // Decode token to extract user info
      const decoded: any = jwtDecode(accessToken);
      const userInfo = decoded.userInfo;
      setUser({
        id: userInfo.user_id,
        username: userInfo.username,
        email: userInfo.email,
      });
      console.log('User info set in context:', userInfo);
      
      navigate('/dashboard'); // or wherever you want after login
    } catch (error) {
      console.log('Login error:', error);
      throw error;
    }
  };

  const signup = async (userData: any) => {
    try {
      const response = await axios.post(`${API_BASE}/api/users`, userData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      navigate('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};