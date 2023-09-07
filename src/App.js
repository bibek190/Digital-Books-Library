import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import { auth } from "./config/firebase-config";
import AdminSignUp from "./pages/auth/AdminSignUp";
import Login from "./pages/auth/Login";
import PublicSignUp from "./pages/auth/PublicSignUp";
import ResetPassword from "./pages/auth/ResetPassword";
import BookLanding from "./pages/books/BookLanding";
import Books from "./pages/books/Books";
import EditBook from "./pages/books/EditBook";
import NewBook from "./pages/books/NewBook";
import { getAllBookAction } from "./pages/books/bookAction";
import BorrowHistory from "./pages/borrowHistory/BorrowHistory";
import Clients from "./pages/clients/Clients";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";
import { getUserAction } from "./user/userAction";

function App() {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (user) => {
    user?.uid && dispatch(getUserAction(user.uid));
  });

  useEffect(() => {
    dispatch(getAllBookAction());
  }, []);

  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="signin" element={<Login />} />
        <Route path="sign-up" element={<PublicSignUp />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="book/:bookId" element={<BookLanding />} />

        {/* Private Routes */}
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="admin-signup"
          element={
            <PrivateRoute>
              <AdminSignUp />
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
          path="new-book"
          element={
            <PrivateRoute>
              <NewBook />
            </PrivateRoute>
          }
        />
        <Route
          path="edit-book/:bookId"
          element={
            <PrivateRoute>
              <EditBook />
            </PrivateRoute>
          }
        />
        <Route
          path="history"
          element={
            <PrivateRoute>
              <BorrowHistory />
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
        <Route path="*" element={<p>This URL is invalid</p>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
