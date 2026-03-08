import { clienteApi } from "@/api/apiCliente";
import { Cliente } from "@/types/Cliente";

export const clienteService = {
  listar: () => clienteApi.listar(),

  criar: (data: Partial<Cliente>) => clienteApi.criar(data),

  atualizar: (id: number, data: Partial<Cliente>) =>
    clienteApi.atualizar(id, data),

  excluir: (id: number) => clienteApi.excluir(id)
};