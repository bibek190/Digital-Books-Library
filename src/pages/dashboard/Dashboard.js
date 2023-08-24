import React from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import AdminLayout from "../../components/layouts/AdminLayout";

function Dashboard() {
  return (
    <>
      <AdminLayout>
        <h3 className="text-center">Dashboard</h3>
        <hr />
      </AdminLayout>
    </>
  );
}

export default Dashboard;
