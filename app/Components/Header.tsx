"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createAuthClient } from "better-auth/client";
import style from "../header.module.css";

const auth = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
});

export default function HeaderPage() {
  const [user, setUser] = useState<{
    name?: string;
    email?: string;
  } | null>(null);

  useEffect(() => {
    auth.getSession().then((res) => {
      setUser(res?.data?.user ?? null);
    });
  }, []);

  const signOut = async () => {
    await auth.signOut();
    window.location.href = "/";
  };

  return (
    <header>
      <nav className={style.bg}>
        <ul className={style.ul}>
          <li><Link href="/">Home</Link></li>

          {user ? (
            <>
              <li>{user.name}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={signOut} className={style.btn1}>
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/signin" className={style.btn1}>Sign In</Link>
              </li>
              <li>
                <Link href="/Signup" className={style.btn2}>Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
