
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bots" element={<Bots />} />
          <Route path="/carteiras" element={<Carteiras />} />
          <Route path="/ganhos" element={<Ganhos />} />
          <Route path="/visao-geral" element={<VisaoGeral />} />
          {/* Redirect index to login */}
          <Route path="/index" element={<Login />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
