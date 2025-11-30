// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import Header from "../components/Header";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Dashboard(){
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.get("/forms")
      .then(res => setForms(res.data || []))
      .catch(err => { console.error(err); setForms([]); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header user={user} onLogout={logout} />
      <div className="container">
        <div className="top-row card">
          <h2>Your Forms</h2>
          <div>
            <button onClick={() => navigate("/builder")}>+ Create Form</button>
          </div>
        </div>

        {loading ? <div className="card">Loading...</div> : (
          <div className="forms-grid">
            {forms.map(f => (
              <div key={f._id} className="form-card card">
                <h4>{f.title || `Form ${f._id.slice(0,6)}`}</h4>
                <p className="muted">{f.questions?.length || 0} questions</p>
                <div className="actions">
                  <a href={`/form/${f._id}`} target="_blank" rel="noreferrer">Open</a>
                  <a href={`/forms/${f._id}/responses`}>Responses</a>
                </div>
              </div>
            ))}
            {!forms.length && <div className="card">No forms yet. Create one!</div>}
          </div>
        )}
      </div>
    </>
  );
}
