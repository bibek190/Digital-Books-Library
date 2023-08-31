import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteBookAction,
  getAllBookAction,
} from "../../pages/books/bookAction";

function BookTable() {
  const dispatch = useDispatch();
  const { bookList } = useSelector((state) => state.book);

  const [displayList, setDisplayList] = useState([]);
  const navigate = useNavigate();
  const handleOnDelete = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteBookAction(id));
      navigate("/books");
    }
  };

  useEffect(() => {
    dispatch(getAllBookAction()); // ALways update booklist
  }, [dispatch]);

  useEffect(() => {
    setDisplayList(bookList);
  }, [bookList]);

  const handleOnChange = (e) => {
    const { value } = e.target;
    console.log(value);
    const filteredBook = bookList.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase())
    );
    console.log("filteredBook", filteredBook);
    setDisplayList(filteredBook);
  };
  return (
    <div>
      <div className="mt-2 mb-2">
        <Form.Control
          onChange={handleOnChange}
          type="text"
          placeholder="Search by book name..."
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayList.map((book, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>
                  <img src={book.url} width={"100px"} />
                </td>
                <td>
                  <h3>{book.title}</h3>
                  <p>
                    {book.name} - {book.year}
                  </p>
                  <p>{book.summary}</p>
                </td>
                <td>
                  <Link to={`/edit-book/${book.id}`}>
                    <Button variant="warning">Edit</Button>
                  </Link>
                  <div className="d-grid mt-3">
                    <Button
                      onClick={() => handleOnDelete(book.id)}
                      variant="danger"
                      type="submit"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default BookTable;
