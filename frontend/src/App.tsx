import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { MainLayout } from "@/components/layout/MainLayout";
import LoginPage from "@/pages/auth/LoginPage";
import DashboardAdmin from "@/pages/dashboard/Dashboard";
import ProdutosPage from "@/pages/utils/ProdutosPage";
import EstoquePage from "@/pages/utils/EstoquePage";
import EntradasPage from "@/pages/utils/EntradasPage";
import VendasPage from "@/pages/utils/VendasPage";
import FornecedoresPage from "@/pages/utils/FornecedoresPage";
import ClientesPage from "@/pages/utils/ClientesPage";
import FuncionariosPage from "@/pages/utils/FuncionariosPage";
import NotFound from "@/pages/utils/NotFound";
import Dashboard from "@/pages/dashboard/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route element={<MainLayout />}>
              <Route path="/dashboard/" element={<Dashboard />} />
              <Route path="/produtos" element={<ProdutosPage />} />
              <Route path="/estoque" element={<EstoquePage />} />
              <Route path="/entradas" element={<EntradasPage />} />
              <Route path="/vendas" element={<VendasPage />} />
              <Route path="/fornecedores" element={<FornecedoresPage />} />
              <Route path="/clientes" element={<ClientesPage />} />
              <Route path="/funcionarios" element={<FuncionariosPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
