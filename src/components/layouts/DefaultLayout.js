import React from "react";
import Footer from "./Footer";
import Header from "./Header";

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="main">{children}</div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
