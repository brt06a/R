'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, AuthState } from '../types';
import { getStoredToken, setStoredToken, removeStoredToken, isTokenExpired } from '../lib/auth';
import api from '../lib/api';

interface AuthContextType extends AuthState {
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const fetchUser = useCallback(async (token: string) => {
    try {
      const response = await api.get('/users/profile');
      const user = response.data.data;
      setState({
        user,
        accessToken: token,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch {
      removeStoredToken();
      setState({ user: null, accessToken: null, isLoading: false, isAuthenticated: false });
    }
  }, []);

  useEffect(() => {
    const token = getStoredToken();
    if (token && !isTokenExpired(token)) {
      fetchUser(token);
    } else {
      removeStoredToken();
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [fetchUser]);

  const login = (token: string, user: User) => {
    setStoredToken(token);
    setState({ user, accessToken: token, isLoading: false, isAuthenticated: true });
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Continue with logout even if API call fails
    }
    removeStoredToken();
    setState({ user: null, accessToken: null, isLoading: false, isAuthenticated: false });
  };

  const updateUser = (updatedFields: Partial<User>) => {
    setState((prev) => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...updatedFields } : null,
    }));
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
