import React from "react";
import Form from "react-bootstrap/Form";

function CustomInput({ label, id, ...rest }) {
  return (
    <div>
      <Form.Group className="mb-3" controlId={id}>
        <Form.Label>{label}</Form.Label>
        <Form.Control {...rest} />
      </Form.Group>
    </div>
  );
}

export default CustomInput;
