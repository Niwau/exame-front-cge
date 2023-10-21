import { Children } from '@/types/Children';
import { createContext, useState, useContext } from 'react';

interface AuthContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export const AuthContextProvider = ({ children }: Children) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
}