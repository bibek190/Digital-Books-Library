import React from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "../../components/layouts/custom-input/CustomInput";
import { useState } from "react";
import { toast } from "react-toastify";

function SignUp() {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (form.password !== form.confirmPassword) {
      toast.error("Confirm password, it did't match");
      return;
    }
  };

  const inputs = [
    {
      label: "First Name",
      name: "fName",
      type: "text",
      placeholder: "Smith",
      required: true,
    },
    {
      label: "Last Name",
      name: "lName",
      type: "text",
      placeholder: "Shrestha",
      required: true,
    },
    {
      label: "Phone",
      name: "phone",
      type: "number",
      placeholder: "1234....",
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "abc@ab.com",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: " 12xxxxx",
      required: true,
    },
    {
      label: "ConfirmPassword",
      name: "password",
      type: "password",
      placeholder: " 12xxxxx",
      required: true,
    },
  ];

  return (
    <DefaultLayout>
      <div className="p-3 border shadow rounded admin-form">
        <Form onSubmit={handleOnSubmit}>
          {inputs.map((input) => (
            <CustomInput onChange={handleChange} {...input} />
          ))}

          <Button variant="success" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </DefaultLayout>
  );
}

export default SignUp;
