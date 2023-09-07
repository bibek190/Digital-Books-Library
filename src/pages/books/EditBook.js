import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";
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
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const selectedBook = useSelector((state) => state.book.selectedBook);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBookAction(bookId));
    setForm(selectedBook);
  }, [bookId]);

  const inputs = [
    {
      label: "Book Title",
      name: "title",
      value: form.title,
      type: "text",
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
      value: form.summary,
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
    dispatch(updateBookAction(form));
  };

  const handleOnDelete = (e) => {
    dispatch(deleteBookAction(bookId));
    navigate("/books");
  };
  return (
    <AdminLayout>
      <h3>Edit Book</h3>
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
            Update
          </Button>
        </Form>
        <Button onClick={handleOnDelete} variant="danger" type="submit">
          Delete
        </Button>
      </div>
    </AdminLayout>
  );
}

export default EditBook;
