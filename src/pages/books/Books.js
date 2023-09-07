import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/layouts/AdminLayout";
import BookTable from "../../components/book/BookTable";

function Books() {
  return (
    <AdminLayout>
      <h3>Books</h3>
      <hr></hr>
      <div>
        <Link to="/new-book">
          <Button>Add Book</Button>
        </Link>
      </div>
      {/* Table and Search bar for table */}
      <BookTable />
    </AdminLayout>
  );
}

export default Books;
