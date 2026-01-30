import { type ReactNode, useEffect, useState } from "react";
import { Sidebar } from "./Sidebar/Sidebar";
import { Header } from "./Header/header";
import "../../styles/layout.scss";

type Props = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: Props) => {
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScreenSize = () => {
      if (window.innerWidth <= 768) {
        setShowNav(false);
        setIsMobile(true);
      } else {
        setShowNav(true);
        setIsMobile(false);
      }
    };

    handleScreenSize();
    window.addEventListener("resize", handleScreenSize);

    return () => {
      window.removeEventListener("resize", handleScreenSize);
    };
  }, []);

  return (
    <>
      <Header showNav={showNav} setShowNav={setShowNav} />
      <Sidebar showNav={showNav} setShowNav={setShowNav} />
      <main
        className={`layout-main ${
          showNav && !isMobile ? "layout-main--expanded" : "layout-main--collapsed"
        }`}
      >
        <div className="layout-main__content">{children}</div>
      </main>
    </>
  );
};