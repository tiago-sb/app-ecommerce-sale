import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { StockBadge } from '@/components/ui/stock-badge';
import { Search } from 'lucide-react';
import { useProdutos } from '@/hooks/useProduto';

export default function EstoquePage() {
  const { produtos } = useProdutos()
  const [filtro, setFiltro] = useState('');

  const filtrados = produtos.filter(p => p.nome.toLowerCase().includes(filtro.toLowerCase()));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Controle de Estoque</h1>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Filtrar por nome..." value={filtro} onChange={e => setFiltro(e.target.value)} className="pl-9" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Estoque</TableHead>
                <TableHead className="text-right">Mínimo</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtrados.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.nome}</TableCell>
                  <TableCell className="text-right">{p.estoqueAtual}</TableCell>
                  <TableCell className="text-right">{p.estoqueMinimo}</TableCell>
                  <TableCell className="text-right"><StockBadge estoque={p.estoqueAtual} estoqueMinimo={p.estoqueMinimo} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
