import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomInput from "../../components/customInput/CustomInput";
import AdminLayout from "../../components/layouts/AdminLayout";
import {
  deleteBookAction,
  getBookAction,
  updateBookAction,
} from "./bookAction";

function EditBook() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedBook } = useSelector((state) => state.book);
  const [form, setForm] = useState({});

  useEffect(() => {
    dispatch(getBookAction(id));
    setForm(selectedBook);
  }, [id]);

  useEffect(() => {
    setForm(selectedBook);
  }, [selectedBook]);

  const inputs = [
    {
      label: "Book Title",
      name: "title",
      type: "text",
      value: form.title,
      placeholder: "Twilight",
      required: true,
    },
    {
      label: "Author Name",
      name: "name",
      value: form.name,
      type: "text",
      placeholder: "Author",
      required: true,
    },
    {
      label: "Published Year",
      name: "year",
      value: form.year,
      type: "number",
      placeholder: "2022",
    },
    {
      label: "Image URL",
      name: "url",
      value: form.url,
      type: "url",
      placeholder: "https://.../",
    },
    {
      label: "Summary",
      name: "summary",
      type: "text",
      value: form.summary,
      as: "textarea",
      rows: "4",
      placeholder: "Summary",
    },
  ];
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(updateBookAction(form));
    // Pas all the book info to FireBase
    // New book action to handle this part
  };

  const handleOnDelete = (e) => {
    dispatch(deleteBookAction(id));
    navigate("/books");
  };

  return (
    <AdminLayout>
      <h3>Edit Book</h3>
      <hr></hr>
      <Link to="/books">
        <Button variant="secondary">
          <AiOutlineArrowLeft />
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
            Update
          </Button>
        </Form>
        <div className="d-grid mt-3">
          <Button onClick={handleOnDelete} variant="danger" type="submit">
            Delete
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default EditBook;
