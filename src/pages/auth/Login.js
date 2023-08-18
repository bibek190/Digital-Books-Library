import React from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "../../components/layouts/custom-input/CustomInput";

function Login() {
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
  ];
  return (
    <DefaultLayout>
      <div className="p-3 border shadow rounded admin-form">
        <Form>
          {inputs.map((input) => (
            <CustomInput {...input} />
          ))}

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </DefaultLayout>
  );
}

export default Login;
