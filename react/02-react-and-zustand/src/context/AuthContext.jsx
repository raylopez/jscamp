import { use, createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const value = {
    login,
    logout,
    isLoggedIn,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
}

export const useAuth = () => {
  const context = use(AuthContext);

  if (context === undefined)
    throw new Error("useAuth() must be within in a context");

  return context;
};
