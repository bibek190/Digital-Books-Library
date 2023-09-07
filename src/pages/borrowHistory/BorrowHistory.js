import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../components/layouts/AdminLayout";
import { updateBookAction } from "../books/bookAction";
import {
  getAllBorrowHistoryAction,
  updateHistoryAction,
} from "./borrowHistoryAction";

function BorrowHistory() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBorrowHistoryAction());
  }, []);

  const historyList = useSelector(
    (state) => state.borrowHistory.borrowHistoryList
  );
  const [displayList, setDisplayList] = useState([]);

  useEffect(() => {
    setDisplayList(historyList);
  }, [historyList]);

  const handleOnChange = (e) => {
    const { value } = e.target;
    const filteredHistory = historyList.filter((history) => {
      return history.title.toLowerCase().includes(value.toLowerCase());
    });
    setDisplayList(filteredHistory);
  };
  const handleReturn = (history) => {
    const borrowObj = {
      id: history.id,
      isReturn: true,
      availableFrom: Date.now(),
    };
    dispatch(updateHistoryAction(borrowObj));

    const bookObj = {
      id: history.bookId,
      isAvailable: true,
      availableFrom: Date.now(),
    };
    dispatch(updateBookAction(bookObj));
  };
  return (
    <AdminLayout>
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
              <th>BorrowedAt</th>
              <th>ReturnedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayList.map((item, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>
                    <img src={item.url} width={"100px"} />
                  </td>
                  <td>{new Date(item.borrowedAt).toDateString()}</td>
                  <td>{new Date(item.availableFrom).toDateString()}</td>
                  <td>
                    {item.isReturn ? (
                      "Returned"
                    ) : (
                      <Button
                        onClick={() => handleReturn(item)}
                        variant="warning"
                      >
                        Return
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </AdminLayout>
  );
}

export default BorrowHistory;
