import { useMemo } from "react";
import { useProdutos } from "@/hooks/useProduto";
import { useVenda } from "@/hooks/useVenda";

import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ShoppingCart, Package, AlertTriangle, DollarSign } from "lucide-react";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

import { COLORS } from "@/components/ui/colors";

export default function Dashboard() {
  const { estoqueTotal, estoqueBaixo } = useProdutos();

  const { faturamento, faturamentoMes, vendasMes, maisVendidos } = useVenda();
  
  const vendasPorMes = useMemo(() => {
    return vendasMes.map(v => ({
      mes: `${v.mes}/${v.ano}`,
      total: v.ano
    }));
  }, [maisVendidos]);

  const produtosMaisVendidos = useMemo(() => {
    return maisVendidos.map(p => ({
      name: p.nome.slice(0, 20),
      value: p.quantidade
    }));
  }, [maisVendidos]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Faturamento Total"
          value={`R$ ${faturamento.toFixed(2)}`}
          icon={DollarSign}
        />
        <StatCard
          title="Faturamento do Mês"
          value={`R$ ${faturamentoMes.toFixed(2)}`}
          icon={ShoppingCart}
        />
        <StatCard
          title="Total em Estoque"
          value={estoqueTotal}
          icon={Package}
        />
        <StatCard
          title="Estoque Baixo"
          value={estoqueBaixo}
          icon={AlertTriangle}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Vendas por Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vendasPorMes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip
                  formatter={(v: number) => `R$ ${v.toFixed(2)}`}
                />
                <Bar
                  dataKey="total"
                  fill="hsl(218, 14%, 49%)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Produtos Mais Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={produtosMaisVendidos}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {produtosMaisVendidos.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}