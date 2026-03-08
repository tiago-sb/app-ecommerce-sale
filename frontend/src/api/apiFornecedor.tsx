import { apiFetch } from "./apiClient";
import { Fornecedor } from "@/types/Fornecedor";

export const fornecedorApi = {

  listar: async (): Promise<Fornecedor[]> =>
    apiFetch("/fornecedor/listar"),

  criar: async (data: Partial<Fornecedor>): Promise<Fornecedor> =>
    apiFetch("/fornecedor/cadastrar", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  atualizar: async (id: number, data: Partial<Fornecedor>): Promise<Fornecedor> =>
    apiFetch(`/fornecedor/alterar/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),

  excluir: async (id: number): Promise<void> =>
    apiFetch(`/fornecedor/deletar/${id}`, {
      method: "DELETE"
    })
};