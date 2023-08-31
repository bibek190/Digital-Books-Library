import { signOut } from "firebase/auth";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import { setAdmin } from "../../user/useSlice";

function Header() {
  const { admin } = useSelector((state) => state.adminInfo);
  const dispatch = useDispatch();
  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(setAdmin({}));
    });
  };
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Library Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            {admin?.uid ? (
              <>
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
                <Link className="nav-link" to="#" onClick={handleLogout}>
                  Sign Out
                </Link>
              </>
            ) : (
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
