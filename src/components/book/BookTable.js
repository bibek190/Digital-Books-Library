import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBookAction } from "../../pages/books/bookAction";

function BookTable() {
  const bookList = useSelector((state) => state.book.bookList);
  const [displayList, setDisplayList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBookAction());
  }, []);

  useEffect(() => {
    setDisplayList(bookList);
  }, [bookList]);

  const handleOnChange = (e) => {
    const { value } = e.target;
    const filteredBook = bookList.filter((book) => {
      return book.title.toLowerCase().includes(value.toLowerCase());
    });
    setDisplayList(filteredBook);
  };

  return (
    <div>
      <div className="mt-2 mb-2">
        <Form.Control
          placeholder="Search by book name..."
          type="text"
          onChange={handleOnChange}
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
                  <p>{book.year}</p>
                  <p>{book.summary}</p>
                </td>
                <td>
                  <Link to={`/edit-book/${book.id}`}>
                    <Button variant="warning">Edit</Button>
                  </Link>
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
