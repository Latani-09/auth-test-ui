import api from "./api";
export async function login(username, password) {
  const res = await fetch("http://localhost:9020/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include"
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error_description || "Login failed");
  return data;
}

export async function refresh() {
  const res = await fetch("http://localhost:9020/auth/refresh", {
    method: "POST",
   credentials: "include"
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error_description || "Refresh failed");
  return data;
}

export async function logout() {
  const res = await api.post("http://localhost:9020/logout", {
    method: "POST",
    credentials: "include"
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error_description || "Logout failed");
  return data;
}