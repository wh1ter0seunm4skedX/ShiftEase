import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  console.log('AuthProvider - Current user state:', user);

  const login = async (email: string, password: string) => {
    try {
      console.log('AuthProvider - Attempting login...');
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        console.error('AuthProvider - Auth error:', authError);
        throw authError;
      }

      if (!authData.user) {
        console.error('AuthProvider - No user data returned');
        throw new Error('No user data returned');
      }

      console.log('AuthProvider - Auth successful, fetching profile...', authData.user);
      
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      console.log('AuthProvider - Profile data:', profileData);
      console.log('AuthProvider - Profile error:', profileError);

      if (profileError) {
        console.error('AuthProvider - Profile error:', profileError);
        throw profileError;
      }

      if (!profileData) {
        console.error('AuthProvider - No profile found');
        throw new Error('No profile found');
      }

      const userData: User = {
        id: profileData.id,
        email: profileData.email,
        name: profileData.name,
        role: profileData.role
      };

      console.log('AuthProvider - Setting user data:', userData);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      return userData; // Return the user data
    } catch (error) {
      console.error('AuthProvider - Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('AuthProvider - Logging out...');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      localStorage.removeItem('user');
      console.log('AuthProvider - Logged out successfully');
    } catch (error) {
      console.error('AuthProvider - Logout error:', error);
    }
  };

  useEffect(() => {
    console.log('AuthProvider - Running auth effect...');
    
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        console.log('AuthProvider - Found existing session:', session.user);
        
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data: profileData, error: profileError }) => {
            console.log('AuthProvider - Profile data from session:', profileData);
            console.log('AuthProvider - Profile error from session:', profileError);
            
            if (profileData) {
              const userData: User = {
                id: profileData.id,
                email: profileData.email,
                name: profileData.name,
                role: profileData.role
              };
              
              console.log('AuthProvider - Setting user data from session:', userData);
              setUser(userData);
              localStorage.setItem('user', JSON.stringify(userData));
            }
          });
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('AuthProvider - Auth state changed:', event, session);
      
      if (session?.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        console.log('AuthProvider - Profile data from auth change:', profileData);
        console.log('AuthProvider - Profile error from auth change:', profileError);
        
        if (profileData) {
          const userData: User = {
            id: profileData.id,
            email: profileData.email,
            name: profileData.name,
            role: profileData.role
          };
          
          console.log('AuthProvider - Setting user data from auth change:', userData);
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
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
