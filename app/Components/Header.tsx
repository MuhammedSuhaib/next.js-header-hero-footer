import React from "react";
import style from "../header.module.css";

function HeaderPage() {
  return (
    <>
      <header>
        <nav className={style.bg}>
          <ul className={style.ul}>
            <li className={style.li}>Home</li>
            <li className={style.li}>About</li>
            <li className={style.li}>Contact</li>
            <li>
              <button className={style.btn1}>SignIn</button>
            </li>
            <li>
              <button className={style.btn2}>SignUp</button>
            </li>
            
          </ul>
        </nav>
      </header>
    </>
  );
}

export default HeaderPage;
