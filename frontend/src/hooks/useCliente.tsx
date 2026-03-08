import { useEffect, useState } from "react";
import { clienteService } from "@/services/clienteService";
import { Cliente } from "@/types/Cliente";

export function useCliente() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);
   
  async function carregar() {
    setLoading(true);
    const data = await clienteService.listar();
    setClientes(data);
    setLoading(false);
  }

  async function criar(cliente: Omit<Cliente, "id">) {
    await clienteService.criar(cliente);
    await carregar();
  }

  async function atualizar(id: number, cliente: Omit<Cliente, "id">) {
    await clienteService.atualizar(id, cliente);
    await carregar();
  }

  async function excluir(id: number) {
    await clienteService.excluir(id);
    await carregar();
  }

  useEffect(() => {
    carregar();
  }, []);

  return {
    clientes,
    loading,
    carregar,
    criar,
    atualizar,
    excluir
  };
}