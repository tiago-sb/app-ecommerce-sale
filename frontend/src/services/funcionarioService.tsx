import { funcionarioApi } from "@/api/apiFuncionario";
import { Funcionario } from "@/types/Funcionario";

export const funcionarioService = {
  listar: () => funcionarioApi.listar(),

  criar: (data: Partial<Funcionario>) => funcionarioApi.criar(data),

  atualizar: (id: number, data: Partial<Funcionario>) =>
    funcionarioApi.atualizar(id, data),

  excluir: (id: number) => funcionarioApi.excluir(id)
};