import { useEffect, useState } from "react";
import { useProdutos } from "@/hooks/useProduto";
import { useFornecedores } from "@/hooks/useFornecedor";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EntradasPage() {
  const { produtos, carregar, atualizar } = useProdutos();
  const { fornecedores } = useFornecedores();

  const [fornecedorId, setFornecedorId] = useState<string>("");
  const [produtoId, setProdutoId] = useState<number | null>(null);

  const [quantidade, setQuantidade] = useState<number>(1);
  const [valorUnitario, setValorUnitario] = useState<number | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    carregar();
  }, []);

  const selecionarProduto = (value: string) => {
    const id = Number(value);
    setProdutoId(id);

    const produto = produtos.find(p => p.id === id);

    if (produto) {
      setValorUnitario(produto.precoCusto);
    }
  };

  const adicionar = async () => {
    const produtoSelecionado = produtos.find(p => p.id === produtoId);

    if (!produtoSelecionado) {
      toast({
        title: "Selecione um produto",
        variant: "destructive"
      });
      return;
    }

    const novoEstoque = produtoSelecionado.estoqueAtual + quantidade;

    const precoFinal = valorUnitario ?? produtoSelecionado.precoCusto;

    const produtoAtualizado = {
      nome: produtoSelecionado.nome,
      unidade: produtoSelecionado.unidade,
      precoCusto: precoFinal,
      precoVenda: produtoSelecionado.precoVenda,
      estoqueAtual: novoEstoque,
      estoqueMinimo: produtoSelecionado.estoqueMinimo
    };

    try {
      await atualizar(produtoSelecionado.id, produtoAtualizado);

      toast({
        title: "Estoque atualizado com sucesso"
      });

      setProdutoId(null);
      setQuantidade(1);
      setValorUnitario(null);

      carregar();
    } catch {
      toast({
        title: "Erro ao atualizar produto",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Registrar Entrada de Produtos
      </h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Dados da Entrada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Fornecedor</Label>
            <Select
              value={fornecedorId}
              onValueChange={setFornecedorId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o fornecedor" />
              </SelectTrigger>
              <SelectContent>
                {fornecedores.map(f => (
                  <SelectItem
                    key={f.id}
                    value={f.id.toString()}
                  >
                    {f.nome}
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
                  <SelectValue placeholder="Selecione o produto" />
                </SelectTrigger>
                <SelectContent>
                  {produtos.map(p => (
                    <SelectItem
                      key={p.id}
                      value={p.id.toString()}
                    >
                      {p.nome}
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
              <Label>Valor Unitário</Label>
              <Input
                type="number"
                step="0.01"
                value={valorUnitario ?? ""}
                onChange={e =>
                  setValorUnitario(Number(e.target.value))
                }
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
    </div>
  );
}