export const salvarToken = (token: string) => { localStorage.setItem("token", token); }

export const removerToken = () => { localStorage.removeItem("token"); }

export const obterToken = () => { return localStorage.getItem("token"); }

export const decodificarToken = (token: string) => { return JSON.parse(atob(token.split('.')[1])); }