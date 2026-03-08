import { apiFetch } from "./apiClient";
import { Produto } from "@/types/Produto";

export const produtoApi = {

  listar: async (): Promise<Produto[]> =>
    apiFetch("/produto/listar"),

  buscarPorNome: async (nome: string): Promise<Produto[]> =>
    apiFetch(`/produto/buscar?nome=${nome}`),

  criar: async (data: Partial<Produto>): Promise<Produto> =>
    apiFetch("/produto/cadastrar", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  atualizar: async (id: number, data: Partial<Produto>): Promise<Produto> =>
    apiFetch(`/produto/alterar/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),

  excluir: async (id: number): Promise<void> =>
    apiFetch(`/produto/deletar/${id}`, {
      method: "DELETE"
    }),

  estoqueTotal: async (): Promise<number> =>
    apiFetch("/produto/total"),
  
  estoqueBaixo: async (): Promise<number> =>
    apiFetch("/produto/estoque_baixo")
};