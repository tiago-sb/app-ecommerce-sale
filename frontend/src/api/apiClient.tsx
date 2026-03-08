export const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(url: string, options?: RequestInit) {

  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    ...options
  });

  if (!response.ok) throw new Error("Erro na requisição");

  if(response.status === 204) return null
  
  return response.json();
}