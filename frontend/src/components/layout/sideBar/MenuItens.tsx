import { LayoutDashboard, Package, Boxes, ArrowDownToLine, ShoppingCart, Truck, Users, UserCog, BarChart3 } from "lucide-react";
import { MenuItem } from "./MenuItem";

export const menuItens: MenuItem[] = [
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { title: 'Produtos', path: '/produtos', icon: Package },
  { title: 'Estoque', path: '/estoque', icon: Boxes },
  { title: 'Entradas', path: '/entradas', icon: ArrowDownToLine },
  { title: 'Vendas', path: '/vendas', icon: ShoppingCart },
  { title: 'Fornecedores', path: '/fornecedores', icon: Truck },
  { title: 'Clientes', path: '/clientes', icon: Users },
  { title: 'Funcionários', path: '/funcionarios', icon: UserCog }
];