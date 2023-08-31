import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import BookTable from "../../components/book/BookTable";
import AdminLayout from "../../components/layouts/AdminLayout";
import { useDispatch } from "react-redux";
import { deleteBookAction } from "./bookAction";

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
      <BookTable />
    </AdminLayout>
  );
}

export default Books;
