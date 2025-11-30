// src/services/authService.js
import api from "./api";

export async function getMe() {
  const res = await api.get("/auth/me");
  return res.data;
}

export async function startAirtableOAuth() {
  // redirect to backend which starts OAuth
  window.location.href = "/api/auth/airtable";
}

export async function logout() {
  await api.post("/auth/logout");
  window.location.href = "/";
}
