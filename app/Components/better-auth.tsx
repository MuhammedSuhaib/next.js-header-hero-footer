"use client";

import { createAuthClient } from "better-auth/client";
import { useState } from "react";

const auth = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
});

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const log = (...args: unknown[]) => console.log("[AUTH]", ...args);

  const signUp = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    log("SIGN UP", { email, name });

    const result = await auth.signUp.email({
      email,
      password,
      name,
    });

    log("SIGN UP RESULT", result);

    if (result.error) {
      setError(result.error.message ?? "Signup failed");
    } else {
      setSuccess("Signed up successfully");
    }

    setLoading(false);
  };

  const signIn = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    log("SIGN IN", { email });

    const result = await auth.signIn.email({
      email,
      password,
    });

    log("SIGN IN RESULT", result);

    if (result.error) {
      setError(result.error.message ?? "Signin failed");
    } else {
      setSuccess("Signed in successfully");
    }

    setLoading(false);
  };

  const signOut = async () => {
    log("SIGN OUT");
    await auth.signOut();
    setSuccess("Signed out");
  };

  return (
    <main style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>Auth Test</h2>

      <input
        placeholder="name (signup)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={signIn} disabled={loading}>
          Sign In
        </button>
        <button onClick={signUp} disabled={loading}>
          Sign Up
        </button>
        <button onClick={signOut}>
          Sign Out
        </button>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </main>
  );
}


const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#020617",
    padding: 16,
  },
  card: {
    background: "#020617",
    border: "1px solid #1e293b",
    padding: 24,
    borderRadius: 12,
    width: "100%",
    maxWidth: 380,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #334155",
    background: "#020617",
    color: "#fff",
  },
  primary: {
    padding: 10,
    borderRadius: 8,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  secondary: {
    padding: 10,
    borderRadius: 8,
    background: "#16a34a",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  message: {
    textAlign: "center",
    marginTop: 8,
  },
};
