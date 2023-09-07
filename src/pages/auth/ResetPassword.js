import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { auth } from "../../config/firebase-config";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CustomInput from "../../components/customInput/CustomInput";
import DefaultLayout from "../../components/layouts/DefaultLayout";
function ResetPassword() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({});

  const inputs = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "sam@smith.com",
      required: true,
    },
  ];

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { email } = form;
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        toast.success("Reset Successful");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  return (
    <DefaultLayout>
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
            Reset Password
          </Button>
        </Form>
      </div>
    </DefaultLayout>
  );
}

export default ResetPassword;
