import Head from "next/head";
import Footer from "./Footer";
import NavBar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
