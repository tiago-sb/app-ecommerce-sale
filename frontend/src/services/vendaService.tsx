import { vendaApi } from "@/api/apiVenda";

export const vendaService = {
  faturamento: () => vendaApi.faturamento(),

  faturamentoMes: () => vendaApi.faturamentoMes(),

  maisVendidos: () => vendaApi.maisVendidos(),

  vendaMes: () => vendaApi.vendaMes()
};