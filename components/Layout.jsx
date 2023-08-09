import Head from "next/head";
import Footer from "./Footer";
import dynamic from "next/dynamic";
const NavBar = dynamic(() => import("./NavBar"), { ssr: false });

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
