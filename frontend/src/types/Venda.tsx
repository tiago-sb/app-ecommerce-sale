export type Venda = {
  id: number
  custo: number
  data: string
  cliente_id: number
  produto_id: number
}

export type ProdutoMaisUsado = {
  nome: string
  quantidade: number
}

export type VendaMes = {
  quantidade: number
  valor: number
  ano: number
  mes: number
}