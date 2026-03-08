import { produtoApi } from "@/api/apiProduto";
import { Produto } from "@/types/Produto";

export const produtoService = {

  listar: () => produtoApi.listar(),

  buscar: (nome: string) => {
    if (!nome) return produtoApi.listar();
    return produtoApi.buscarPorNome(nome);
  },

  criar: (data: Partial<Produto>) => produtoApi.criar(data),

  atualizar: (id: number, data: Partial<Produto>) =>
    produtoApi.atualizar(id, data),

  excluir: (id: number) => produtoApi.excluir(id),

  estoqueTotal: () => produtoApi.estoqueTotal(),
    
  estoqueBaixo: () => produtoApi.estoqueBaixo()
};