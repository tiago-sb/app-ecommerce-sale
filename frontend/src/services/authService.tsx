export const loginRequest = async (login: string, senha: string) => {
  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, senha })
  });

  if (!response.ok) {
    throw new Error("Credenciais Inválidas");
  }

  return response.json();
}