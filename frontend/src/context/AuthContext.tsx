import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Usuario, Perfil } from '@/types/Perfil';
import { loginRequest } from '@/services/authService';
import { decodificarToken, removerToken, salvarToken } from '@/utils/token';

interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const login = async (login: string, senha: string): Promise<boolean> => {
  try {
    const data = await loginRequest(login, senha);

    salvarToken(data.token);

    const payload = decodificarToken(data.token);

    const user: Usuario = {
      id: payload.sub,
      nome: payload.nome || payload.sub,
      email: payload.sub
    };

    setUsuario(user);

    return true;
  } catch {
    return false;
  }
};
  
  const logout = () => {
    removerToken()
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
