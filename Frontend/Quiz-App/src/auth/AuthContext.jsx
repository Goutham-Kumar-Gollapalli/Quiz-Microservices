import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

function readUser() {
  try {
    const saved = localStorage.getItem('quizbattleUser');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);

  const value = useMemo(() => ({
    user,
    login(auth) {
      const nextUser = { name: auth.name, email: auth.email, role: auth.role };
      localStorage.setItem('token', auth.token);
      localStorage.setItem('quizbattleUser', JSON.stringify(nextUser));
      setUser(nextUser);
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('quizbattleUser');
      setUser(null);
    }
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}

export function canManage(user) {
  return user?.role === 'TEACHER' || user?.role === 'ADMIN';
}
