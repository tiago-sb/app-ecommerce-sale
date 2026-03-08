import { fornecedorApi } from "@/api/apiFornecedor";
import { Fornecedor } from "@/types/Fornecedor";

export const fornecedorService = {
  listar: async (): Promise<Fornecedor[]> => {
    return fornecedorApi.listar();
  },

  criar: async (data: Partial<Fornecedor>): Promise<Fornecedor> => {
    return fornecedorApi.criar(data);
  },

  atualizar: async (id: number, data: Partial<Fornecedor>): Promise<Fornecedor> => {
    return fornecedorApi.atualizar(id, data);
  },

  excluir: async (id: number): Promise<void> => {
    return fornecedorApi.excluir(id);
  }
};