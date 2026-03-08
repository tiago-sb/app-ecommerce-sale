import { useEffect, useState } from "react";
import { produtoService } from "@/services/produtoService";
import { Produto } from "@/types/Produto";

export function useProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);

  const [estoqueTotal, setEstoqueTotal] = useState<number>(0);
  const [estoqueBaixo, setEstoqueBaixo] = useState<number>(0);

  async function carregar() {
    setLoading(true);

    const data = await produtoService.listar();
    setProdutos(data);

    setLoading(false);
  }

  async function buscar(nome: string) {
    if (!nome) {
      carregar();
      return;
    }

    const data = await produtoService.buscar(nome);
    setProdutos(data);
  }

  async function criar(produto: Omit<Produto, "id">) {
    await produtoService.criar(produto);
    await carregar();
  }

  async function atualizar(id: number, produto: Omit<Produto, "id">) {
    await produtoService.atualizar(id, produto);
    await carregar();
  }

  async function excluir(id: number) {
    await produtoService.excluir(id);
    await carregar();
  }

  async function carregarEstoqueTotal() {
    const total = await produtoService.estoqueTotal();
    setEstoqueTotal(total);
  }

  async function carregarEstoqueBaixo() {
    const baixo = await produtoService.estoqueBaixo();
    setEstoqueBaixo(baixo);
  }

  useEffect(() => {
    carregar();
    carregarEstoqueTotal();
    carregarEstoqueBaixo();
  }, []);

  return {
    produtos,
    loading,
    estoqueTotal,
    estoqueBaixo,
    carregar,
    buscar,
    criar,
    atualizar,
    excluir
  };
}