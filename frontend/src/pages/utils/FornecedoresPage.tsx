import { useState } from 'react';
import { useFornecedores } from '@/hooks/useFornecedor';
import { Fornecedor } from '@/types/Fornecedor';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function FornecedoresPage() {
  const { fornecedores, criar, atualizar, excluir } = useFornecedores();

  const [editando, setEditando] = useState<Fornecedor | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [form, setForm] = useState({nome: '', cnpj: '', contato: '', cidade: ''});

  const { toast } = useToast();

  const resetForm = () => setForm({ nome: '', cnpj: '', contato: '', cidade: '' });

  const openNovo = () => { 
    resetForm();
    setEditando(null);
    setDialogOpen(true);
  };

  const openEditar = (f: Fornecedor) => {
    setEditando(f);
    setForm({
      nome: f.nome,
      cnpj: f.cnpj,
      contato: f.contato,
      cidade: f.cidade
    });
    setDialogOpen(true);
  };

  async function salvar() {
    if (editando) {
      await atualizar(editando.id, form);
      toast({ title: 'Fornecedor atualizado!' });
    } else {
      await criar(form);
      toast({ title: 'Fornecedor cadastrado!' });
    }

    setDialogOpen(false);
    resetForm();
  }

  async function remover(id: number) {
    await excluir(id);
    toast({ title: 'Fornecedor excluído.' });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Fornecedores</h1>
        <Button onClick={openNovo}>
          <Plus className="h-4 w-4 mr-1" />
          Novo Fornecedor
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fornecedores.map(f => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium">{f.nome}</TableCell>
                  <TableCell>{f.cnpj}</TableCell>
                  <TableCell>{f.contato}</TableCell>
                  <TableCell>{f.cidade}</TableCell>
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
        </CardContent>
      </Card>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editando ? 'Editar Fornecedor' : 'Novo Fornecedor'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                value={form.nome}
                onChange={e => setForm({ ...form, nome: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>CNPJ</Label>
              <Input
                value={form.cnpj}
                onChange={e => setForm({ ...form, cnpj: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Contato</Label>
              <Input
                value={form.contato}
                onChange={e => setForm({ ...form, contato: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Cidade</Label>
              <Input
                value={form.cidade}
                onChange={e => setForm({ ...form, cidade: e.target.value })}
              />
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