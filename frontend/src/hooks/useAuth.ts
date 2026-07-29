import { createContext, useContext, useState, useEffect, ReactNode, createElement } from 'react';
import { authService } from '../services/api';
import { User } from '../types';

interface AuthCtx {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthCtx>({} as AuthCtx);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem('frigopom_token');
    const u = localStorage.getItem('frigopom_user');
    if (t && u) {
      setToken(t);
      setUser(JSON.parse(u));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authService.login(email, password);
    const { token: t, user: u } = res.data;
    localStorage.setItem('frigopom_token', t);
    localStorage.setItem('frigopom_user', JSON.stringify(u));
    setToken(t);
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('frigopom_token');
    localStorage.removeItem('frigopom_user');
    setToken(null);
    setUser(null);
  };

  return createElement(AuthContext.Provider, { value: { user, token, login, logout, loading } }, children);
}

export const useAuth = () => useContext(AuthContext);
