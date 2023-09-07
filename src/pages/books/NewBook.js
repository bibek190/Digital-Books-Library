import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CustomInput from "../../components/customInput/CustomInput";
import AdminLayout from "../../components/layouts/AdminLayout";
import { addNewBookAction } from "./bookAction";

function NewBook() {
  const [form, setForm] = useState({
    isAvailable: true,
  });
  const dispatch = useDispatch();
  const inputs = [
    {
      label: "Book Title",
      name: "title",
      type: "text",
      placeholder: "Twilight",
      required: true,
    },
    {
      label: "Author Name",
      name: "name",
      type: "text",
      placeholder: "Author",
      required: true,
    },
    {
      label: "Published Year",
      name: "year",
      type: "number",
      placeholder: "2022",
    },
    {
      label: "Image URL",
      name: "url",
      type: "url",
      placeholder: "https://.../",
    },
    {
      label: "Summary",
      name: "summary",
      type: "text",
      as: "textarea",
      rows: "4",
      placeholder: "Summary",
    },
  ];
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data", form);

    // Call Firebase and save the data
    // Call a addnewBookAction wich will take care of things for us!
    dispatch(addNewBookAction(form));
  };
  return (
    <AdminLayout>
      <h3>New Book</h3>
      <hr></hr>
      <Link to="/books">
        <Button variant="secondary">
          <BiArrowBack />
          Go Back
        </Button>
      </Link>
      <div className="p-3 border shadow rounded admin-form">
        <Form onSubmit={handleOnSubmit}>
          {inputs.map((input, i) => (
            <CustomInput
              key={i}
              onChange={handleOnChange}
              // label={input.label}
              // placeholder={input.placeholder}
              // type={input.type}
              {...input}
            />
          ))}

          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </div>
    </AdminLayout>
  );
}

export default NewBook;
