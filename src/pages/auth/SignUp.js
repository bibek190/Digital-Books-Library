import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import CustomInput from "../../components/customInput/CustomInput";
import AdminLayout from "../../components/layouts/AdminLayout";
import { auth, db } from "../../config/firebase-config";

function SignUp() {
  const [form, setForm] = useState({});
  const [errorMsg, setErrorMsg] = useState();

  const inputs = [
    {
      label: "First Name",
      name: "fName",
      type: "text",
      placeholder: "Sam",
      required: true,
    },
    {
      label: "Last Name",
      name: "lName",
      type: "text",
      placeholder: "Smith",
      required: true,
    },
    {
      label: "Phone",
      name: "phone",
      type: "number",
      placeholder: "04xxxxxx",
      required: true,
    },
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
      minLength: 6,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "*******",
      required: true,
      minLength: 6,
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Confirm pass and pass did not match");
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
        pending: "In Progress...",
      });

      const authSnap = await authSnapPromise;
      if (authSnap.user.uid) {
        // const docRef = doc(db, "users", authSnap.user.uid);
        const { password, confirmPassword, ...rest } = form;
        await setDoc(doc(db, "users", authSnap.user.uid), rest);

        toast.success("New user has been created");
      }
    } catch (e) {
      let { message } = e;
      console.log(e);
      if (message.includes("auth/email-already-in-use")) {
        toast.error("Email already exist, try with different email");
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
    <AdminLayout>
      <div className="p-3 border shadow rounded admin-form">
        {errorMsg && <Alert variant={"danger"}>{errorMsg}</Alert>}
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
            Register
          </Button>
        </Form>
      </div>
    </AdminLayout>
  );
}

export default SignUp;
