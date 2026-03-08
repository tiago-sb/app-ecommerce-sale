import { useState } from 'react'
import { useProdutos } from '@/hooks/useProduto'
import { Produto } from '@/types/Produto'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from '@/components/ui/table'

import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from '@/components/ui/dialog'

import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function ProdutosPage() {
  const { produtos, buscar, criar, atualizar, excluir } = useProdutos()
  const { toast } = useToast()

  const [filtro, setFiltro] = useState('')
  const [editando, setEditando] = useState<Produto | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const [form, setForm] = useState({
    nome: '',
    unidade: 'UN',
    precoCusto: 0,
    precoVenda: 0,
    estoqueAtual: 0,
    estoqueMinimo: 10
  })

  const [pagina, setPagina] = useState(1)
  const porPagina = 5

  const totalPaginas = Math.ceil(produtos.length / porPagina)
  const paginados = produtos.slice((pagina - 1) * porPagina, pagina * porPagina)

  function resetForm() {
    setForm({
      nome: '',
      unidade: 'UN',
      precoCusto: 0,
      precoVenda: 0,
      estoqueAtual: 0,
      estoqueMinimo: 10
    })
  }

  function openNovo() {
    resetForm()
    setEditando(null)
    setDialogOpen(true)
  }

  function openEditar(p: Produto) {
    setEditando(p)
    setForm({
      nome: p.nome,
      unidade: p.unidade,
      precoCusto: p.precoCusto,
      precoVenda: p.precoVenda,
      estoqueAtual: p.estoqueAtual,
      estoqueMinimo: p.estoqueMinimo
    })
    setDialogOpen(true)
  }

  async function salvar() {
    if (editando) {
      await atualizar(editando.id, form)
      toast({ title: 'Produto atualizado com sucesso!' })
    } else {
      await criar(form)
      toast({ title: 'Produto cadastrado com sucesso!' })
    }
    setDialogOpen(false)
  }

  async function remover(id: number) {
    await excluir(id)
    toast({ title: 'Produto excluído.' })
  }

  async function handleBuscar(nome: string) {
    setFiltro(nome)
    await buscar(nome)
    setPagina(1)
  }

  const lucro = form.precoVenda - form.precoCusto
  const margem = form.precoCusto > 0 ? (lucro / form.precoCusto) * 100 : 0
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <Button onClick={openNovo}>
          <Plus className="h-4 w-4 mr-1" /> Novo Produto
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filtrar por nome..."
          value={filtro}
          onChange={e => handleBuscar(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Unidade</TableHead>
                <TableHead className="text-right">Custo</TableHead>
                <TableHead className="text-right">Venda</TableHead>
                <TableHead className="text-right">Lucro</TableHead>
                <TableHead className="text-right">Margem</TableHead>
                <TableHead className="text-right">Estoque</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginados.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.nome}</TableCell>
                  <TableCell>{p.unidade}</TableCell>
                  <TableCell className="text-right">R$ {p.precoCusto.toFixed(2)}</TableCell>
                  <TableCell className="text-right">R$ {p.precoVenda.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    R$ {(p.precoVenda - p.precoCusto).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    {p.precoCusto > 0
                      ? (((p.precoVenda - p.precoCusto) / p.precoCusto) * 100).toFixed(1)
                      : 0}%
                  </TableCell>
                  <TableCell className="text-right">{p.estoqueMinimo}</TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEditar(p)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => remover(p.id)}>
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

      {totalPaginas > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPaginas }, (_, i) => (
            <Button
              key={i}
              variant={pagina === i + 1 ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPagina(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editando ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">

            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                value={form.nome}
                onChange={e => setForm({ ...form, nome: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Unidade</Label>
                <Input
                  value={form.unidade}
                  onChange={e => setForm({ ...form, unidade: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Estoque Mínimo</Label>
                <Input
                  type="number"
                  value={form.estoqueMinimo}
                  onChange={e =>
                    setForm({ ...form, estoqueMinimo: Number(e.target.value) })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="space-y-2">
                <Label>Preço Custo</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.precoCusto}
                  onChange={e =>
                    setForm({ ...form, precoCusto: Number(e.target.value) })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Preço Venda</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.precoVenda}
                  onChange={e =>
                    setForm({ ...form, precoVenda: Number(e.target.value) })
                  }
                />
              </div>

            </div>

            <div className="space-y-2">
              <Label>Estoque Inicial</Label>
              <Input
                type="number"
                value={form.estoqueAtual}
                onChange={e =>
                  setForm({ ...form, estoqueAtual: Number(e.target.value) })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4 p-3 rounded-md bg-muted">
              <div>
                <span className="text-sm text-muted-foreground">Lucro:</span>
                <span className="font-semibold"> R$ {lucro.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Margem:</span>
                <span className="font-semibold"> {margem.toFixed(1)}%</span>
              </div>
            </div>

            <Button className="w-full" onClick={salvar}>
              Salvar
            </Button>

          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}