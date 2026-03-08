import { useEffect, useState } from "react";
import { funcionarioService } from "@/services/funcionarioService";
import { Funcionario } from "@/types/Funcionario";

export function useFuncionario() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(false);
   
  async function carregar() {
    setLoading(true);
    const data = await funcionarioService.listar();
    setFuncionarios(data);
    setLoading(false);
  }

  async function criar(funcionario: Omit<Funcionario, "id">) {
    await funcionarioService.criar(funcionario);
    await carregar();
  }

  async function atualizar(id: number, funcionario: Omit<Funcionario, "id">) {
    await funcionarioService.atualizar(id, funcionario);
    await carregar();
  }

  async function excluir(id: number) {
    await funcionarioService.excluir(id);
    await carregar();
  }

  useEffect(() => {
    carregar();
  }, []);

  return {
    funcionarios,
    loading,
    carregar,
    criar,
    atualizar,
    excluir
  };
}