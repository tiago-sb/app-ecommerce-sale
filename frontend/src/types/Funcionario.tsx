import { Perfil } from "./Perfil"

export type Funcionario = {
  id: number
  nome: string
  cpf: string
  funcao: string
  perfil: Perfil
}