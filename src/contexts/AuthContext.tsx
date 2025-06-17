
import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authApi, AuthResponse } from "@/api/apiUtils";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  token: string | null;
  user: any | null;
  login: (token: string, user?: any) => void;
  logout: () => void;
  refreshToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem("refreshToken"));
  const [user, setUser] = useState<any | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = (newToken: string, userData?: any) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    
    if (userData) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    }
    
    navigate("/dashboard");
  };

  const logout = async () => {
    try {
      if (refreshToken) {
        // Chamar o endpoint de logout se houver um refresh token
        await authApi.logout(refreshToken);
      }
    } catch (error: any) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      // Mesmo se a API falhar, ainda fazemos logout no lado do cliente
      setToken(null);
      setRefreshToken(null);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      toast({
        title: "Logout realizado com sucesso",
        description: "Você saiu da sua conta com sucesso.",
      });
      navigate("/");
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
