"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { createAuthClient } from "better-auth/client";

const auth = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
});

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await auth.signIn.email({
      email,
      password,
    });

    if (res.error) {
      setError(res.error.message ?? "Sign in failed");
      return;
    }

    window.location.href = "/";
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <form onSubmit={submit}>
    <label htmlFor="email">Email</label>
    <input
      id="email"
      type="email"
      name="email"
      autoComplete="email"
      value={email}
      onChange={onEmailChange}
    />

    <label htmlFor="password">Password</label>
    <input
      id="password"
      type="password"
      name="password"
      autoComplete="current-password"
      value={password}
      onChange={onPasswordChange}
    />

      <button type="submit">Sign In</button>

      {error && <p>{error}</p>}
    </form>
  );
}
