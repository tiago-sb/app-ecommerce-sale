import { useEffect, useState } from "react";
import { vendaService } from "@/services/vendaService";
import { ProdutoMaisUsado, VendaMes } from "@/types/Venda";

export function useVenda() {
  const [faturamento, setFaturamento] = useState<number>(0);
  const [faturamentoMes, setFaturamentoMes] = useState<number>(0);
  const [vendasMes, setVendasMes] = useState<VendaMes[]>([]);
  const [maisVendidos, setMaisVendidos] = useState<ProdutoMaisUsado[]>([]);
  const [loading, setLoading] = useState(false);

  async function carregar() {
    try {
      setLoading(true);

      const [
        faturamentoTotal,
        faturamentoMensal,
        vendasPorMes,
        produtosMaisVendidos
      ] = await Promise.all([
        vendaService.faturamento(),
        vendaService.faturamentoMes(),
        vendaService.vendaMes(),
        vendaService.maisVendidos()
      ]);

      setFaturamento(faturamentoTotal);
      setFaturamentoMes(faturamentoMensal);
      setVendasMes(vendasPorMes);
      setMaisVendidos(produtosMaisVendidos);

    } catch (error) {
      console.error("Erro ao carregar dados de vendas", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  return {
    faturamento,
    faturamentoMes,
    vendasMes,
    maisVendidos,
    loading,
    carregar
  };
}