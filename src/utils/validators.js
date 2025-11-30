// src/utils/validators.js
export function validateRequired(value) {
  if (value === undefined || value === null) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

export function validateSingleSelect(value, options = []) {
  if (!value) return true;
  return options.includes(value);
}

export function validateMultiSelect(value, options = []) {
  if (!Array.isArray(value)) return false;
  return value.every(v => options.includes(v));
}
