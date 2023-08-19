import React from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "../../components/layouts/custom-input/CustomInput";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../../config/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function SignUp() {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Confirm password, it did't match");
      return;
    }
    const { email, password } = form;

    try {
      const authSnapPromise = createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.promise(authSnapPromise, {
        pending: "In progress....",
        success: "Successfully created",
      });
      const authSnap = await authSnapPromise;
      if (authSnap.user.uid) {
        const docRef = doc(db, "users", authSnap.user.uid);
        await setDoc(docRef, form);
      }
      // if (authSnap.user.uid) {
      //   toast.success("New user has been created");
      // }
    } catch (e) {
      console.log(e.message);
      if (e.message.includes("auth/email-already-in-use")) {
        toast.error("Email already exist!!");
      } else {
        toast.error("Something went wrong.Please try again");
      }
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
      name: "confirmPassword",
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
            <CustomInput onChange={handleChange} key={i} {...input} />
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
