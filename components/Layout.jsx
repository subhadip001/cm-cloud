import Head from "next/head";
import Footer from "./Footer";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Navbar = dynamic(() => import("./Navbar"), { ssr: false });

export default function Layout({ children }) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Navbar />}
      {children}
      {!isLoginPage && <Footer />}
    </>
  );
}
