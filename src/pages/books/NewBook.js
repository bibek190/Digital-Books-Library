import React, { useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "../../components/layouts/custom-input/CustomInput";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase-config";
import { getUserAction } from "../../user/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layouts/AdminLayout";
import { addNewBookAction } from "./bookAction";

function NewBook() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(addNewBookAction(form));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

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
  return (
    <AdminLayout>
      <h3>New Book</h3>
      <hr />
      <Link to="/books">
        <Button variant="secondary"> 👈 Go Back</Button>
      </Link>
      <div className="p-3 border shadow rounded admin-form">
        <Form onSubmit={handleOnSubmit}>
          {inputs.map((input, i) => (
            <CustomInput {...input} key={i} onChange={handleChange} />
          ))}

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </AdminLayout>
  );
}

export default NewBook;
