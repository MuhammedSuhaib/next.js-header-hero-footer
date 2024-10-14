import React from "react";
import Link from "next/link";
import style from "../hero.module.css";

function FooterPage() {
  return (
    <>
      <footer>
        <section style={{ background: "black" }}>
          <p>‎ </p>
        </section>
        <section className={style.hero}>
          <p>
            &copy; Code is open source. Feel free to use and modify it as you
            wish. 😊
          </p>
          <p>
            Connect me:{" "}
            <Link
              href="https://www.linkedin.com/in/suhaib1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <button className={style.heroButton}>Linkedin</button>
            </Link>{" "}
          </p>
        </section>
      </footer>
    </>
  );
}

export default FooterPage;
