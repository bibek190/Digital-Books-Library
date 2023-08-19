import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "../../components/layouts/custom-input/CustomInput";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase-config";

function Login() {
  const [form, setForm] = useState();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data", form);
    const { email, password } = form;
    try {
      const signInPromise = signInWithEmailAndPassword(auth, email, password);
      toast.promise(signInPromise, {
        pending: "In Progress....",
      });
      const signInValue = await signInPromise;
      toast.success("Logged in Successfully");
    } catch (e) {
      let { message } = e;
      if (message.includes("auth/wrong-password")) {
        toast.error("Invalid Login");
      } else {
        toast.error(message);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const inputs = [
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
        <Form onSubmit={handleOnSubmit}>
          {inputs.map((input, i) => (
            <CustomInput {...input} key={i} onChange={handleChange} />
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
