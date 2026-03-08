import { apiFetch } from "./apiClient";
import { Cliente } from "@/types/Cliente";

export const clienteApi = {

  listar: async (): Promise<Cliente[]> =>
    apiFetch("/cliente/listar"),

  criar: async (data: Partial<Cliente>): Promise<Cliente> =>
    apiFetch("/cliente/cadastrar", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  atualizar: async (id: number, data: Partial<Cliente>): Promise<Cliente> =>
    apiFetch(`/cliente/alterar/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),

  excluir: async (id: number): Promise<void> =>
    apiFetch(`/cliente/deletar/${id}`, {
      method: "DELETE"
    })

};