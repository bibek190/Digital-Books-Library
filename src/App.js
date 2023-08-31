import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import { auth } from "./config/firebase-config";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Books from "./pages/books/Books";
import EditBook from "./pages/books/EditBook";
import NewBook from "./pages/books/NewBook";
import Clients from "./pages/clients/Clients";
import Dashboard from "./pages/dashboard/Dashboard";
import History from "./pages/history/History";
import Home from "./pages/home/Home";
import { getUserAction } from "./user/userAction";

function App() {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (user) => {
    user?.uid && dispatch(getUserAction(user.uid));
  });
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="signin" element={<Login />} />

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
              <SignUp />
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
          path="edit-book/:id"
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
        <Route path="*" element={<Home />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
