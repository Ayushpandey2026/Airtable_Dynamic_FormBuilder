// src/services/airtableService.js
import api from "./api";

export const fetchUserBases = async () => {
  const res = await api.get("/airtable/bases");
  return res.data; // [{ id, name }, ...]
};

export const fetchTablesForBase = async (baseId) => {
  const res = await api.get(`/airtable/bases/${baseId}/tables`);
  return res.data;
};

export const fetchFieldsForTable = async (baseId, tableId) => {
  const res = await api.get(`/airtable/bases/${baseId}/tables/${tableId}/fields`);
  return res.data; // [{ id, name, type, options? }, ...]
};
