import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Books from "./pages/books/Books";
import Clients from "./pages/clients/Clients";
import Dashboard from "./pages/dashboard/Dashboard.js";
import History from "./pages/history/History";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import { onAuthStateChanged } from "firebase/auth";
import { getUserAction } from "./user/userAction";
import { useDispatch } from "react-redux";
import { auth } from "./config/firebase-config";
import NewBook from "./pages/books/NewBook";

function App() {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (user) => {
    user?.uid && dispatch(getUserAction(user.uid));
  });
  return (
    <div>
      <Routes>
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="books"
          element={
            <PrivateRoute>
              <Books />
            </PrivateRoute>
          }
        />
        <Route
          path="history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />
        <Route
          path="clients"
          element={
            <PrivateRoute>
              <Clients />
            </PrivateRoute>
          }
        />
        <Route
          path="new-book"
          element={
            <PrivateRoute>
              <NewBook />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-signup"
          element={
            <PrivateRoute>
              <SignUp />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
