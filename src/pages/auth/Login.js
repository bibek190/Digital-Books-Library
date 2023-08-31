import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { auth } from "../../config/firebase-config";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomInput from "../../components/customInput/CustomInput";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { getUserAction } from "../../user/userAction";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.adminInfo);
  useEffect(() => {
    admin?.uid && navigate("/dashboard");
  }, [admin, navigate]);

  const [form, setForm] = useState({});

  const inputs = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "sam@smith.com",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "*******",
      required: true,
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data", form);
    const { email, password } = form;
    try {
      const signInPromise = signInWithEmailAndPassword(auth, email, password);
      toast.promise(signInPromise, {
        pending: "In Progress...",
      });
      const { user } = await signInPromise;

      // Create a seaprate file to handle this (Action)
      // Once login successful...> send another call to firebase to grab user info and then save respone to store
      // Make a call
      // Grab valur form DB
      // useDispatch to sabe Admin
      dispatch(getUserAction(user.uid));
      toast.success("Logged In Successfully");
      navigate("/dashboard");
    } catch (e) {
      let { message } = e;
      if (message.includes("auth/wrong-password")) {
        toast.error("Invalid Login");
      } else {
        toast.error(message);
      }
    }
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
            Login
          </Button>
        </Form>
      </div>
    </DefaultLayout>
  );
}

export default Login;
