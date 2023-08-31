import React from "react";
import SideBar from "../sideBar/SideBar";
import Footer from "./Footer";
import Header from "./Header";
function AdminLayout({ children }) {
  return (
    <div className="d-flex">
      <SideBar />
      <div className="w-75 flex-grow-1">
        <Header />
        <div className="main">{children}</div>
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;
