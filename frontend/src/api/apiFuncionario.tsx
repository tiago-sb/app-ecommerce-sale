import { apiFetch } from "./apiClient";
import { Funcionario } from "@/types/Funcionario";

export const funcionarioApi = {

  listar: async (): Promise<Funcionario[]> =>
    apiFetch("/funcionario/listar"),

  criar: async (data: Partial<Funcionario>): Promise<Funcionario> =>
    apiFetch("/funcionario/cadastrar", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  atualizar: async (id: number, data: Partial<Funcionario>): Promise<Funcionario> =>
    apiFetch(`/funcionario/alterar/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),

  excluir: async (id: number): Promise<void> =>
    apiFetch(`/funcionario/deletar/${id}`, {
      method: "DELETE"
    })

};