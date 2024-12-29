import React, { createContext, useContext, useState, useEffect } from 'react';
    import { User } from '../types';
    import { mockUsers } from '../data/mockData';

    interface AuthContextType {
      user: User | null;
      login: (email: string, password: string) => Promise<void>;
      logout: () => void;
    }

    const AuthContext = createContext<AuthContextType | undefined>(undefined);

    export function AuthProvider({ children }: { children: React.ReactNode }) {
      const [user, setUser] = useState<User | null>(null);

      const login = async (email: string, password: string) => {
        const mockUser = mockUsers.find(u => u.email === email);
        if (mockUser) {
          setUser(mockUser);
          localStorage.setItem('user', JSON.stringify(mockUser));
        } else {
          throw new Error('Invalid credentials');
        }
      };

      const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
      };

      useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);

      return (
        <AuthContext.Provider value={{ user, login, logout }}>
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
