import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./sidebar/Sidebar";

function AdminLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="w-75 flex-grow-1">
        <Header />
        <div className="main">{children}</div>
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;
