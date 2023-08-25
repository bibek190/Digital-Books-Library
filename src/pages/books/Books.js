import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BookTable from "../../components/book/BookTable";

function Books() {
  return (
    <>
      <AdminLayout>
        <h3 className="text-center">Books</h3>
        <hr />
        <div>
          <Link to="/new-book">
            <Button>Add BooK</Button>
          </Link>
        </div>
        <BookTable />
      </AdminLayout>
    </>
  );
}

export default Books;
