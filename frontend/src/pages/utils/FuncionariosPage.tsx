import { useState, useEffect } from "react";
import { useFuncionario } from "@/hooks/useFuncionario";
import { Funcionario } from "@/types/Funcionario";
import { Perfil } from "@/types/Perfil";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FuncionariosPage() {

  const { funcionarios, loading, carregar, criar, atualizar, excluir } = useFuncionario();

  const [editando, setEditando] = useState<Funcionario | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [form, setForm] = useState<{
    nome: string
    cpf: string
    funcao: string
    perfil: Perfil
  }>({
    nome: "",
    cpf: "",
    funcao: "",
    perfil: "VENDEDOR"
  });

  const { toast } = useToast();

  useEffect(() => {
    carregar();
  }, []);

  const resetForm = () => {
    setForm({
      nome: "",
      cpf: "",
      funcao: "",
      perfil: "VENDEDOR"
    });
  };
  
  const openNovo = () => {
    resetForm();
    setEditando(null);
    setDialogOpen(true);
  };

  const openEditar = (f: Funcionario) => {
    setEditando(f);
    setForm({
      nome: f.nome,
      cpf: f.cpf,
      funcao: f.funcao,
      perfil: f.perfil
    });
    setDialogOpen(true);
  };

  const salvar = async () => {
    if (editando) {
      await atualizar(editando.id, form);
      toast({
        title: "Funcionário atualizado!"
      });
    } else {
      await criar(form);
      toast({
        title: "Funcionário cadastrado!"
      });
    }
    setDialogOpen(false);
    resetForm();
  };

  const remover = async (id: number) => {
    await excluir(id);
    toast({
      title: "Funcionário excluído."
    });
  };

  const perfilLabel: Record<string, string> = {
    VENDEDOR: "VENDEDOR",
    ESTOQUISTA: "ESTOQUISTA"
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Funcionários
        </h1>
        <Button onClick={openNovo}>
          <Plus className="h-4 w-4 mr-1" />
          Novo Funcionário
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-center">
              Carregando funcionários...
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Perfil</TableHead>
                  <TableHead className="text-right">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {funcionarios.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell className="font-medium">
                      {f.nome}
                    </TableCell>
                    <TableCell>
                      {f.cpf}
                    </TableCell>
                    <TableCell>
                      {f.funcao}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {perfilLabel[f.perfil]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditar(f)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => remover(f.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editando ? "Editar Funcionário" : "Novo Funcionário"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                value={form.nome}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nome: e.target.value
                  })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>CPF</Label>
                <Input
                  value={form.cpf}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      cpf: e.target.value
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Função</Label>
                <Input
                  value={form.funcao}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      funcao: e.target.value
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Perfil</Label>
              <Select
                value={form.perfil}
                onValueChange={(v) =>
                  setForm({
                    ...form,
                    perfil: v as Perfil
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ESTOQUISTA">
                    ESTOQUISTA
                  </SelectItem>
                  <SelectItem value="VENDEDOR">
                    VENDEDOR
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="w-full"
              onClick={salvar}
            >
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}