import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './ContextReducer';
import { Bag, Person } from "react-bootstrap-icons";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("authToken");
        navigate("/");
      };

      const items = useCart();
    return (
        <div>
        <nav
          className="navbar navbar-expand-lg navbar-dark  position-sticky"
          style={{
            position: "fixed",
            backgroundColor: "black", // #161D29
            // zIndex: "10",
            width: "100%",
            filter: "brightness(100%)",
          }}
        >
          <div className="container-fluid">
            <Link
              className="navbar-brand fs-1 fst-italic text-white"
              style={{ color: "#161A1F" }}
              to="/"
            >
             Snack's Sprint
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ backgroundColor: "black", borderColor: "white" }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5 mx-3 text-white  "
                    aria-current="page"
                    to="/feedback"
                  >
                    Contact
                  </Link>
                </li>
                {localStorage.getItem("authToken") ? ( // when user is logged in then we display the my orders button
                  <li className="nav-item">
                    <Link
                      className="nav-link active fs-5 mx-3 text-white"
                      aria-current="page"
                      to="/myOrder"
                    >
                      My Orders
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
              {!localStorage.getItem("authToken") ? ( // here we check if the user is logged in or not if not then we display the login and signup button
                <form className="d-flex">
                  {/*  we allow the user to added item to the cart without login */}
                  <div className="btn mx-2 text-white position-relative">
                    {items.length > 0 && (
                      <span className="badge bg-success rounded-circle position-absolute top-0 start-100 translate-middle">
                        {items.length}
                      </span>
                    )}
                    <Link to="/order">
                      {" "}
                      {/*  Bootstrap's Bag icon for Cart */}
                      <Bag
                        width="24"
                        height="24"
                        style={{ color: "white" }}
                      ></Bag>{" "}
                    </Link>
                  </div>
                  <Link className="btn mx-1 fs-5 text-white" to="/login">
                    Login
                  </Link>
                  <Link
                    className="btn mx-1 fs-5 text-white" // bg-white
                    to="/register"
                  >
                    Register
                  </Link>
                </form>
              ) : (
                // when user is logged in then we display the cart and logout button also
                <div>
                  <div className="btn mx-2 text-white position-relative">
                    {items.length > 0 && (
                      <span className="badge bg-success rounded-circle position-absolute top-0 start-100 translate-middle">
                        {items.length}
                      </span>
                    )}
                    <Link to="/order">
                      {" "}
                      {/*  Bootstrap's Bag icon for Cart */}
                      <Bag
                        width="24"
                        height="24"
                        style={{ color: "white" }}
                      ></Bag>{" "}
                    </Link>
                  </div>

                  <Link className="btn mx-1 fs-5 text-white" to="/user-profile">
                    <Person
                      width="24"
                      height="24"
                      style={{ marginRight: "5px", color: "white" }} // Change the color to your preferred color
                    />
                  </Link>
                  <button
                    className="btn  text-danger mx-2 fs-5"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    );
};

export default Navbar;