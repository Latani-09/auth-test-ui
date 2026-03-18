import React, { useState } from "react";
import { login, refresh, logout } from "../api/auth";

export default function LoginTest() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [lastResponse, setLastResponse] = useState(null);
  const [error, setError] = useState("");

  async function onLogin(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await login(username, password);
      localStorage.setItem("access_token", data.access_token || "");
      setAccessToken(data.access_token || "");
      setLastResponse(data);
    } catch (e) {
      setError(e.message || String(e));
    }
  }

  async function onRefresh() {
    setError("");
    try {
      const data = await refresh();
      setAccessToken(data.access_token || "");
      setLastResponse(data);
    } catch (e) {
      setError(e.message || String(e));
    }
  }

  async function onLogout() {
    setError("");
    try {
      const data = await logout();
      setAccessToken("");
      setLastResponse(data);
    } catch (e) {
      setError(e.message || String(e));
    }
  }

  return (
    <div style={{ maxWidth: 760, margin: "40px auto", fontFamily: "system-ui" }}>
      <h2>Auth Test UI (JWT + HttpOnly refresh cookie)</h2>

      <p>
        Backend expected at <code>http://localhost:8080</code>. This UI proxies <code>/auth</code> to it.
      </p>
      <p>
        After login, check DevTools → Application → Cookies for <code>refresh_token</code>.
      </p>

      <form onSubmit={onLogin} style={{ display: "grid", gap: 10 }}>
        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "100%", padding: 8 }} />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: 8 }} />
        </label>
        <button type="submit" style={{ padding: 10 }}>Login</button>
      </form>

      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <button onClick={onRefresh} style={{ padding: 10 }}>Refresh (cookie)</button>
        <button onClick={onLogout} style={{ padding: 10 }}>Logout</button>
      </div>

      {error && <p style={{ color: "crimson" }}><b>Error:</b> {error}</p>}

      <h3>Access token</h3>
      <pre style={{ background: "#f6f8fa", padding: 12, whiteSpace: "pre-wrap" }}>
        {accessToken || "(none)"}
      </pre>

      <h3>Last response</h3>
      <pre style={{ background: "#f6f8fa", padding: 12 }}>
        {lastResponse ? JSON.stringify(lastResponse, null, 2) : "(none)"}
      </pre>
      <button
      onClick={() => {
        window.location.href = "http://localhost:9020/oauth2/authorization/google";
      }}
      style={{ padding: 10 }}
    >
      Login with Google
    </button>
    </div>
  );
}