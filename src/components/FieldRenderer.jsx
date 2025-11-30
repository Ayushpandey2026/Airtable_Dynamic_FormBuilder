// src/components/FieldRenderer.jsx
import React from "react";
import "./FieldRenderer.css";

/**
 props:
  - question: { questionKey, label, type, required, options }
  - value, onChange
*/
export default function FieldRenderer({ question, value, onChange }) {
  const { label, type, required, options } = question;

  if (type === "short_text") {
    return (
      <div className="field">
        <label>{label}{required && <span className="req">*</span>}</label>
        <input value={value || ""} onChange={e => onChange(e.target.value)} />
      </div>
    );
  }

  if (type === "long_text") {
    return (
      <div className="field">
        <label>{label}{required && <span className="req">*</span>}</label>
        <textarea value={value || ""} onChange={e => onChange(e.target.value)} />
      </div>
    );
  }

  if (type === "single_select") {
    return (
      <div className="field">
        <label>{label}{required && <span className="req">*</span>}</label>
        <select value={value || ""} onChange={e => onChange(e.target.value)}>
          <option value="">-- select --</option>
          {options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
    );
  }

  if (type === "multi_select") {
    const handleToggle = (opt) => {
      const arr = Array.isArray(value) ? [...value] : [];
      const idx = arr.indexOf(opt);
      if (idx === -1) arr.push(opt); else arr.splice(idx,1);
      onChange(arr);
    };

    return (
      <div className="field">
        <label>{label}{required && <span className="req">*</span>}</label>
        <div className="multiselect">
          {options?.map(opt => (
            <label key={opt} className="chip">
              <input type="checkbox" checked={Array.isArray(value) && value.includes(opt)} onChange={() => handleToggle(opt)} />
              {opt}
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (type === "attachment") {
    return (
      <div className="field">
        <label>{label}{required && <span className="req">*</span>}</label>
        <input type="file" onChange={e => onChange(e.target.files)} />
      </div>
    );
  }

  return <div className="unsupported">Unsupported field type: {type}</div>;
}
