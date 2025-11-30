// src/pages/ResponsesList.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "./ResponsesList.css";

export default function ResponsesList(){
  const { formId } = useParams();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/forms/${formId}/responses`)
      .then(res => setResponses(res.data || []))
      .catch(err => {
        console.error(err);
        setResponses([]);
      })
      .finally(() => setLoading(false));
  }, [formId]);

  if (loading) return <div className="card">Loading responses...</div>;
  if (!responses.length) return <div className="card">No submissions yet.</div>;

  return (
    <div className="responses card">
      <h3>Responses ({responses.length})</h3>
      <ul>
        {responses.map(r => (
          <li key={r._id} className={r.deletedInAirtable ? "deleted" : ""}>
            <div className="meta">
              <strong>{r.airtableRecordId || r._id}</strong>
              <span>{new Date(r.createdAt).toLocaleString()}</span>
              <span className="status">{r.deletedInAirtable ? "Deleted in Airtable" : r.status || "synced"}</span>
            </div>
            <div className="preview">
              {Object.entries(r.answers || {}).slice(0,3).map(([k,v]) => (
                <div key={k} className="ans">
                  <small>{k}:</small> <span>{Array.isArray(v) ? v.join(", ") : String(v)}</span>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
