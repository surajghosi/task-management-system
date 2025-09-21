import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import type { ReactNode } from "react";
type AuthContextType = {
  isAuthenticated: boolean;
  login: (token:string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token") 
  );

  const login = (token:string) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", token); 
  };

  const logout = () => {
    toast.success("✅ Logged out successfully!");
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("kanban");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};