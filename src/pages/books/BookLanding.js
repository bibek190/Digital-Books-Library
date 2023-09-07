import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { addNewBorrowAction } from "../borrowHistory/borrowHistoryAction";

function BookLanding() {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.adminInfo.admin);
  const bookList = useSelector((state) => state.book.bookList);

  const [selectedBook, setSelectedBook] = useState({});

  useEffect(() => {
    const tempBook = bookList.find((book) => book.id === bookId);
    setSelectedBook(tempBook);
  }, [bookList, bookId]);

  const fourteenDaysInMs = 14 * 24 * 60 * 60 * 1000;
  const handleOnBorrow = () => {
    // create history obj
    const history = {
      userId: user.uid,
      userName: user.fName,
      bookId: bookId,
      title: selectedBook.title,
      url: selectedBook.url,
      borrowedAt: Date.now(),
      availableFrom: Date.now() + fourteenDaysInMs,
    };
    // console.log("history", history);
    // Dispatch to save it on DB
    dispatch(addNewBorrowAction(history));
  };
  return (
    <DefaultLayout>
      <Container>
        <Row>
          <Link to={"/"}>
            <Button variant="secondary" className="mb-2">
              {" "}
              &lt; Go Back
            </Button>
          </Link>
        </Row>
        <Row>
          {/* Image */}
          <Col>
            <img src={selectedBook?.url} />
          </Col>
          {/* Infor Of Book */}
          <Col>
            <h3>{selectedBook?.title}</h3>
            <p>Ratings: 5 start</p>
            <p>
              {selectedBook?.name} - {selectedBook?.year}
            </p>
            <p>{selectedBook?.summary}</p>
            <p>
              {user?.uid ? (
                selectedBook?.isAvailable ? (
                  <Button onClick={handleOnBorrow}>Borrow</Button>
                ) : (
                  <Button variant="secondary">
                    Available from{" "}
                    {new Date(selectedBook?.availableFrom).toDateString()} date
                  </Button>
                )
              ) : (
                <Link to="/signin">
                  <Button>Login to Borrow</Button>
                </Link>
              )}
            </p>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
}

export default BookLanding;
