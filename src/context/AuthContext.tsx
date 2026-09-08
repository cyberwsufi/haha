import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Student } from '../types/student';
import { mockStudents } from '../mock/students';

interface AuthContextValue {
  currentUser: Student;
  updateProfile: (updated: Partial<Student>) => void;
  switchUser: (studentId: string) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Student>(mockStudents[0]);

  const updateProfile = (updated: Partial<Student>) => {
    setCurrentUser((prev) => ({ ...prev, ...updated }));
  };

  const switchUser = (studentId: string) => {
    const target = mockStudents.find((s) => s.id === studentId);
    if (target) setCurrentUser(target);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        updateProfile,
        switchUser,
        isAuthenticated: true,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
