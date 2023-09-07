import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Carousels from "../../components/carousels/Carousels";
import CustomCard from "../../components/custom-card/CustomCard";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import "./home.css";
function Home() {
  const bookList = useSelector((state) => state.book.bookList);
  return (
    <DefaultLayout>
      {/* Hero SEction */}
      <Carousels />

      <Container>
        {/* Heading */}
        <Row>
          <Col>
            <h1>Available Books</h1>
            <hr />
          </Col>
        </Row>
        {/* Book Cards */}
        <Row>
          <Col className="d-flex justify-content-around flex-wrap g-2">
            {bookList.map((book) => {
              return <CustomCard key={book.id} {...book} />;
            })}
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
}

export default Home;
