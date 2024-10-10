import { createContext, useContext, useState, ReactNode } from 'react';
import { isToken, removeToken, setToken } from '../utils/localStorageActions';

type AuthContextType = {
  authToken: string | null;
  removeAuthToken: () => void;
  updateToken: (token: string) => void;
};

type AuthProviderPropsType = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderPropsType> = ({ children }) => {
  const [authToken, setAuthToken] = useState(isToken());

  const removeAuthToken = (): void => {
    setAuthToken(null);
    removeToken();
  };

  const updateToken = (token: string): void => {
    setAuthToken(token);
    setToken(token);
  };

  const value = { authToken, removeAuthToken, updateToken };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
