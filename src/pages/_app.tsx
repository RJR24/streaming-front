import React from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

import "../assets/css/globals.css";
import "../assets/css/changePassword-style.css";
import "../assets/css/dashboard-styles.css";
import "../assets/css/login-styles.css";
import "../assets/css/navbar-styles.css";
import "../assets/css/signup-styles.css";
import "../assets/css/hero-styles.css";
import "../assets/css/SignInSignUpHeaderStyles.css";


const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const hideNavbarOnPages = ["/login", "/signup"];

  // Check if the current route is in the hideNavbarOnPages array
  const shouldHideNavbar = hideNavbarOnPages.includes(router.pathname);
  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default App;
