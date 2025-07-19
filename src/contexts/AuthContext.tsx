import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../pages/login-page/LoginPage";

type UserRole = "customer" | "restaurant_owner" | null;

interface AuthContextType {
  user: User | null;
  role: UserRole;
  setUser: (user: User | null) => void;
  setRole: (role: UserRole) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [role, setRoleState] = useState<UserRole>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    if (storedUser) setUserState(JSON.parse(storedUser));
    if (storedRole) setRoleState(storedRole as UserRole);
  }, []);

  // Update localStorage when values change
  const setUser = (user: User | null) => {
    setUserState(user);
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  };

  const setRole = (role: UserRole) => {
    setRoleState(role);
    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ user, role, setUser, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
