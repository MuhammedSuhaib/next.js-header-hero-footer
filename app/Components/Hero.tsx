import React from "react";
import style from "../hero.module.css";
import Link from "next/link";

function HeroPage() {
  return (
    <>
      <section className={style.hero}>
        <h2>Welcome to My Website</h2>
        <p>Your one-stop solution for all things tech.</p>
        <p>Explore our website to learn more about us and our products.</p>
        <p>But</p>
        <p>
          “Don’t press the button below; it does absolutely nothing! But if you
          do, just remember: the button’s feelings might be hurt!”
        </p>
      <Link href="/Signup" className={style.heroButton}>
        Get Started
      </Link>

      </section>
    </>
  );
}

export default HeroPage;
