import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: 'finder' | 'owner';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (
    name: string,
    email: string,
    password: string,
    phone: string,
    type: 'finder' | 'owner'
  ) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Mock login
    const mockUser: User = {
      id: 1,
      name: 'John Doe',
      email,
      phone: '050-1234567',
      type: 'finder',
    };
    setUser(mockUser);
  };

  const signup = (
    name: string,
    email: string,
    password: string,
    phone: string,
    type: 'finder' | 'owner'
  ) => {
    // Mock signup
    const newUser: User = {
      id: Date.now(),
      name,
      email,
      phone,
      type,
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
