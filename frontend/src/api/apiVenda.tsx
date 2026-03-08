import { ProdutoMaisUsado, VendaMes } from "@/types/Venda";
import { apiFetch } from "./apiClient";

export const vendaApi = {
  faturamento: async (): Promise<number> =>
    apiFetch("/venda/faturamento"),

  faturamentoMes: async (): Promise<number> =>
    apiFetch("/venda/faturamento_mes"),

  maisVendidos: async (): Promise<ProdutoMaisUsado[]> =>
    apiFetch("/venda/mais_vendidos"),

  vendaMes: async (): Promise<VendaMes[]> =>
    apiFetch("/venda/vendas_mes")
};