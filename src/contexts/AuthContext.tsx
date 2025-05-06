
import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api/apiUtils";
import { API_ENDPOINTS } from "@/api/constants";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    navigate("/dashboard");
  };

  const logout = async () => {
    try {
      if (token) {
        // Chamar o endpoint de logout se houver um token
        await api.post(API_ENDPOINTS.users.logout, {}, true);
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      // Mesmo se a API falhar, ainda fazemos logout no lado do cliente
      setToken(null);
      localStorage.removeItem("token");
      toast({
        title: "Logout realizado com sucesso",
        description: "Você saiu da sua conta com sucesso.",
      });
      navigate("/");
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
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
