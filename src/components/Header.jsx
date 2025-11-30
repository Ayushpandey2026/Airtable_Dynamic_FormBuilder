// src/components/Header.jsx
import React from "react";
import "./Header.css";

export default function Header({ user, onLogout }) {
  return (
    <header className="app-header">
      <div className="brand">
        <a href="/">Airtable Form Builder</a>
      </div>
      <nav className="nav">
        <a href="/builder">Builder</a>
        <a href="/">Dashboard</a>
      </nav>
      <div className="auth">
        {user ? (
          <>
            <span className="user-name">{user.name || user.email}</span>
            <button className="link-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <a className="login-btn" href="/api/auth/airtable">Login with Airtable</a>
        )}
      </div>
    </header>
  );
}
