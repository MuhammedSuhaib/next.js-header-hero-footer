"use client";

import { useState, type FormEvent } from "react";
import { createAuthClient } from "better-auth/client";

const auth = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
});

type Background = {
  software: string;
  hardware: string;
  goal: string;
};

function UserBackgroundForm({
  value,
  onChange,
}: {
  value: Background;
  onChange: (v: Background) => void;
}) {
  const update = (key: keyof Background, v: string) =>
    onChange({ ...value, [key]: v });

  const Section = ({
    title,
    name,
    options,
  }: {
    title: string;
    name: keyof Background;
    options: string[];
  }) => (
    <section>
      <p>{title}</p>
      {options.map((opt) => (
        <label key={opt}>
          <input
            type="radio"
            name={name}
            checked={value[name] === opt}
            onChange={() => update(name, opt)}
          />
          {opt}
        </label>
      ))}
    </section>
  );

  return (
    <>
      <Section
        title="Software Skill Level"
        name="software"
        options={["Beginner", "Intermediate", "Advanced"]}
      />
      <Section
        title="Hardware Access"
        name="hardware"
        options={["RTX", "Jetson", "Robot", "Simulation"]}
      />
      <Section
        title="Primary Goal"
        name="goal"
        options={["Learn", "Build", "Deploy", "Research"]}
      />
    </>
  );
}

export default function SignupPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [bg, setBg] = useState<Background>({
    software: "",
    hardware: "",
    goal: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!bg.software || !bg.hardware || !bg.goal) {
      setError("Please answer all questions");
      setLoading(false);
      return;
    }

    const res = await auth.signUp.email({ email, password, name });

    if (res.error) {
      setError(res.error.message ?? "Signup failed");
      setLoading(false);
      return;
    }

    // SAVE QUESTIONS + ANSWERS
    await fetch("/api/user-background", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [
          { q: "Software Skill Level", a: bg.software },
          { q: "Hardware Access", a: bg.hardware },
          { q: "Primary Goal", a: bg.goal },
        ],
      }),
    });

    window.location.href = "/";
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <UserBackgroundForm value={bg} onChange={setBg} />

      <button type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Sign up"}
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}
