'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isUnlocked: boolean;
  unlock: () => void;
  lock: () => void;
  user: any;
  setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const unlock = () => setIsUnlocked(true);
  const lock = () => setIsUnlocked(false);

  return (
    <AuthContext.Provider value={{ isUnlocked, unlock, lock, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
