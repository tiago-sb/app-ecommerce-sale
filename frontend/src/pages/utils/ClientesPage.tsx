import { useState } from "react";
import { useCliente } from "@/hooks/useCliente";
import { Cliente } from "@/types/Cliente";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ClientesPage() {
  const { clientes, criar, atualizar, excluir } = useCliente();

  const [editando, setEditando] = useState<Cliente | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ nome: "", cpf: "", email: "", telefone: "", cidade: "" });
  const [erros, setErros] = useState<Record<string, string>>({});
  const { toast } = useToast();

  function resetForm() {
    setForm({ nome: "", cpf: "", email: "", telefone: "", cidade: "" });
    setErros({});
  }

  function openNovo() {
    resetForm();
    setEditando(null);
    setDialogOpen(true);
  }

  function openEditar(c: Cliente) {
    setEditando(c);

    setForm({ nome: c.nome, cpf: c.cpf, email: c.email, telefone: c.telefone, cidade: c.cidade });

    setErros({});
    setDialogOpen(true);
  }

  function validar() {
    const e: Record<string, string> = {};

    if (!form.nome.trim()) e.nome = "Nome obrigatório";
    if (!form.cpf.trim()) e.cpf = "CPF obrigatório";
    if (!form.email.includes("@")) e.email = "Email inválido";

    setErros(e);

    return Object.keys(e).length === 0;
  }

  async function salvar() {

    if (!validar()) return;

    if (editando) {
      await atualizar(editando.id, form);
      toast({ title: "Cliente atualizado!" });
    } else {
      await criar(form);
      toast({ title: "Cliente cadastrado!" });
    }

    setDialogOpen(false);
  }

  async function remover(id: number) {
    await excluir(id);
    toast({ title: "Cliente excluído." });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Button onClick={openNovo}>
          <Plus className="h-4 w-4 mr-1" />
          Novo Cliente
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientes.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">
                    {c.nome}
                  </TableCell>
                  <TableCell>{c.cpf}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.telefone}</TableCell>
                  <TableCell>{c.cidade}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditar(c)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => remover(c.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editando ? "Editar Cliente" : "Novo Cliente"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                value={form.nome}
                onChange={(e) =>
                  setForm({ ...form, nome: e.target.value })
                }
              />
              {erros.nome && (
                <p className="text-xs text-destructive">{erros.nome}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>CPF</Label>
                <Input
                  value={form.cpf}
                  onChange={(e) =>
                    setForm({ ...form, cpf: e.target.value })
                  }
                />
                {erros.cpf && (
                  <p className="text-xs text-destructive">{erros.cpf}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
                {erros.email && (
                  <p className="text-xs text-destructive">{erros.email}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input
                  value={form.telefone}
                  onChange={(e) =>
                    setForm({ ...form, telefone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Cidade</Label>
                <Input
                  value={form.cidade}
                  onChange={(e) =>
                    setForm({ ...form, cidade: e.target.value })
                  }
                />
              </div>
            </div>
            <Button className="w-full" onClick={salvar}>
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}