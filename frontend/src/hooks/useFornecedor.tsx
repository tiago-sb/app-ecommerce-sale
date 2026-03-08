import { useEffect, useState } from "react";
import { fornecedorService } from "@/services/fornecedorService";
import { Fornecedor } from "@/types/Fornecedor";

export function useFornecedores() {

  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState(false);

  async function carregar() {
    setLoading(true);
    const data = await fornecedorService.listar();
    setFornecedores(data);
    setLoading(false);
  }

  async function criar(data: Partial<Fornecedor>) {
    await fornecedorService.criar(data);
    await carregar();
  }

  async function atualizar(id: number, data: Partial<Fornecedor>) {
    await fornecedorService.atualizar(id, data);
    await carregar();
  }

  async function excluir(id: number) {
    await fornecedorService.excluir(id);
    await carregar();
  }

  useEffect(() => {
    carregar();
  }, []);

  return {
    fornecedores,
    loading,
    criar,
    atualizar,
    excluir
  };
}