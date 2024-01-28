import React from "react";
import "../assets/css/globals.css";
import "../assets/css/changePassword-style.css";
import "../assets/css/dashboard-styles.css";
import "../assets/css/login-styles.css";
import "../assets/css/navbar-styles.css";
import "../assets/css/signup-styles.css";
import "../assets/css/hero-styles.css";
import Footer from "../components/footer/Footer";

const App = ({ Component, pageProps }) => {
  return(
    <>
     <Component {...pageProps} />
     <Footer />
    </>
  );
};

export default App;
