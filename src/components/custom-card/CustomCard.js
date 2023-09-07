import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function CustomCard({ id, title, name, year, url }) {
  return (
    <Link to={`/book/${id}`} className="nav-link">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <p>
              {name} - {year}
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default CustomCard;
