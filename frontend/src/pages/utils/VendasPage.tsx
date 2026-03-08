import { useEffect, useState } from "react";

import { useProdutos } from "@/hooks/useProduto";
import { useCliente } from "@/hooks/useCliente";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VendasPage() {
  const { produtos, carregar: carregarProdutos, atualizar } = useProdutos();
  const { clientes, carregar: carregarClientes } = useCliente();
  const { toast } = useToast();
  const [clienteId, setClienteId] = useState<string>("");
  const [produtoId, setProdutoId] = useState<number | null>(null);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [valorUnitario, setValorUnitario] = useState<number | null>(null);
  const [itens, setItens] = useState<any[]>([]);

  useEffect(() => {
    carregarProdutos();
    carregarClientes();
  }, []);

  const selecionarProduto = (value: string) => {
    const id = Number(value);
    setProdutoId(id);
    const produto = produtos.find(p => p.id === id);
    if (produto) {
      setValorUnitario(produto.precoVenda);
    }
  };

  const adicionar = () => {
    const produtoSelecionado = produtos.find(p => p.id === produtoId);
    if (!produtoSelecionado) {
      toast({
        title: "Selecione um produto",
        variant: "destructive"
      });
      return;
    }

    if (quantidade > produtoSelecionado.estoqueAtual) {
      toast({
        title: "Estoque insuficiente",
        variant: "destructive"
      });
      return;
    }

    const novoItem = {
      produtoId: produtoSelecionado.id,
      produtoNome: produtoSelecionado.nome,
      quantidade,
      precoUnitario: valorUnitario ?? produtoSelecionado.precoVenda
    };

    setItens([...itens, novoItem]);
    setProdutoId(null);
    setQuantidade(1);
    setValorUnitario(null);
  };

  const remover = (index: number) => {
    setItens(itens.filter((_, i) => i !== index));
  };

  const totalQtd = itens.reduce((s, i) => s + i.quantidade, 0);
  const totalVenda = itens.reduce(
    (s, i) => s + (i.quantidade * i.precoUnitario),
    0
  );
  const salvar = async () => {
    if (!clienteId) {
      toast({
        title: "Selecione um cliente",
        variant: "destructive"
      });
      return;
    }
    if (itens.length === 0) {
      toast({
        title: "Adicione produtos na venda",
        variant: "destructive"
      });
      return;
    }

    try {
      for (const item of itens) {
        const produto = produtos.find(p => p.id === item.produtoId);
        if (!produto) continue;
        const novoEstoque = produto.estoqueAtual - item.quantidade;
        
        const produtoAtualizado = {
          nome: produto.nome,
          unidade: produto.unidade,
          precoCusto: produto.precoCusto,
          precoVenda: produto.precoVenda,
          estoqueAtual: novoEstoque,
          estoqueMinimo: produto.estoqueMinimo
        };
        await atualizar(produto.id, produtoAtualizado);
      }

      toast({
        title: "Venda registrada com sucesso"
      });

      setItens([]);
      setClienteId("");
      carregarProdutos();

    } catch {
      toast({
        title: "Erro ao registrar venda",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Registrar Venda
      </h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Dados da Venda
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Cliente</Label>
            <Select
              value={clienteId}
              onValueChange={setClienteId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o cliente" />
              </SelectTrigger>
              <SelectContent>
                {clientes.map(c => (
                  <SelectItem
                    key={c.id}
                    value={c.id.toString()}
                  >
                    {c.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label>Produto</Label>
              <Select
                value={produtoId?.toString()}
                onValueChange={selecionarProduto}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {produtos.map(p => (
                    <SelectItem
                      key={p.id}
                      value={p.id.toString()}
                    >
                      {p.nome} (estoque: {p.estoqueAtual})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Quantidade</Label>
              <Input
                type="number"
                min={1}
                value={quantidade}
                onChange={e =>
                  setQuantidade(Number(e.target.value))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Preço Unit.</Label>
              <Input
                disabled
                value={valorUnitario ?? ""}
              />
            </div>
            <Button
              onClick={adicionar}
              disabled={!produtoId}
            >
              <Plus className="h-4 w-4 mr-1" />
              Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>
      {itens.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Itens da Venda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Qtd</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Subtotal</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itens.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{item.produtoNome}</TableCell>
                    <TableCell>{item.quantidade}</TableCell>
                    <TableCell>
                      R$ {item.precoUnitario.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      R$ {(item.quantidade * item.precoUnitario).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => remover(i)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500"/>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between mt-4">
              <span>
                Total de itens: {totalQtd}
              </span>
              <span className="font-bold text-lg">
                R$ {totalVenda.toFixed(2)}
              </span>
            </div>
            <Button
              className="w-full mt-4"
              onClick={salvar}
            >
              Confirmar Venda
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}