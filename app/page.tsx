import styles from "./Styles/page.module.css";
import Image from "next/image";
import Header from "@/app/Components/Header";
import HeroPage from "./Components/Hero";
import FooterPage from "./Components/Footer";
export default function HomePage() {
  return (
    <>
      <Header />
      <HeroPage />
      <FooterPage />
    </>
  );
}
