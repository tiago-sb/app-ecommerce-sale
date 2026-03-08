import { Badge } from '@/components/ui/badge';

interface StockBadgeProps {
  estoque: number;
  estoqueMinimo: number;
}

export function StockBadge({ estoque, estoqueMinimo }: StockBadgeProps) {
  if (estoque === 0) {
    return <Badge className="bg-destructive text-destructive-foreground">Sem estoque</Badge>;
  }
  if (estoque <= estoqueMinimo) {
    return <Badge className="bg-warning text-warning-foreground">Estoque baixo</Badge>;
  }
  
  return <Badge className="bg-success text-success-foreground">Normal</Badge>;
}
