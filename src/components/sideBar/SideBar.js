import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SideBar() {
  const { admin } = useSelector((state) => state.adminInfo);
  return (
    <div className="bg-dark text-light sidebar">
      <div className="mt-4 text-center">
        {admin?.role === "student" ? "Student" : "Admin"}
      </div>
      <hr />
      <div>
        <ul className="list-unstyled ms-5 me-5">
          <li>
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/books">
              Books
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/clients">
              Clients
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/history">
              History
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/admin-signup">
              SignUp
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
