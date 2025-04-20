
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Bots from "./pages/Bots";
import Carteiras from "./pages/Carteiras";
import NotFound from "./pages/NotFound";
import Ganhos from "./pages/Ganhos";
import VisaoGeral from "./pages/VisaoGeral";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/bots" element={
              <ProtectedRoute>
                <Bots />
              </ProtectedRoute>
            } />
            <Route path="/carteiras" element={
              <ProtectedRoute>
                <Carteiras />
              </ProtectedRoute>
            } />
            <Route path="/ganhos" element={
              <ProtectedRoute>
                <Ganhos />
              </ProtectedRoute>
            } />
            <Route path="/visao-geral" element={
              <ProtectedRoute>
                <VisaoGeral />
              </ProtectedRoute>
            } />
            <Route path="/index" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
