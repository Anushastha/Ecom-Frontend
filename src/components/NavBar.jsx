import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/nav.css";

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div style={{ marginBottom: "100px" }}>
      <nav
        className="navbar bg-light navbar-expand-lg fixed-top"
        style={{ boxShadow: "0px 2px 10px 0px rgba(99, 99, 99, 0.1)" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            {user && user.isAdmin ? (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    className="nav-link mx-lg-2 font-primary"
                    to="/"
                    exact
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link mx-lg-2 font-primary"
                    to="/admin/colleges"
                  >
                    Colleges
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link mx-lg-2 font-primary"
                    to="/admin/courses"
                  >
                    Courses
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link mx-lg-2 font-primary"
                    to="/admin/blogs"
                  >
                    Blogs
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    className="nav-link mx-lg-2 font-primary"
                    to="/"
                    exact
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link mx-lg-2 font-primary"
                    to="/user/colleges"
                  >
                    Colleges
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link mx-lg-2 font-primary"
                    to="/user/courses"
                  >
                    Courses
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link mx-lg-2 font-primary"
                    to="/user/blogs"
                  >
                    Blogs
                  </NavLink>
                </li>
              </ul>
            )}
            <form className="d-flex gap-2" role="search">
              {user ? (
                <div className="dropdown d-flex align-items-center">
                  {user.profileImage ? (
                    <img
                      className="tw-rounded-full tw-flex tw-items-center tw-justify-center font-secondary font-bold"
                      style={{
                        width: "35px",
                        height: "35px",
                      }}
                      src={user.profileImage}
                    ></img>
                  ) : (
                    <div
                      className="tw-rounded-full tw-flex tw-items-center tw-bg-pink-700 tw-justify-center font-secondary font-bold"
                      style={{
                        width: "35px",
                        height: "35px",
                        color: "white",
                        fontSize: "20px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {user.fullName
                        ? user.fullName.charAt(0).toUpperCase()
                        : ""}{" "}
                    </div>
                  )}

                  <button
                    className="btn dropdown-toggle bg-transparent border-0 font-primary"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      marginRight: "20px",
                    }}
                  >
                    Welcome, {user.fullName ? user.fullName.split(" ")[0] : ""}!{" "}
                  </button>

                  <ul className="dropdown-menu">
                    {user.isAdmin ? (
                      <li>
                        <button
                          onClick={handleLogout}
                          className="dropdown-item font-primary"
                        >
                          Logout
                        </button>
                      </li>
                    ) : (
                      <>
                        <li>
                          <Link
                            className="dropdown-item font-primary"
                            to="/user/changePassword"
                          >
                            Change Password
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item font-primary"
                            to={`/user/userProfile/`}
                          >
                            Profile
                          </Link>
                        </li>

                        <li>
                          <button
                            onClick={handleLogout}
                            className="dropdown-item font-primary"
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              ) : (
                <div className="mt-3 mt-lg-0">
                  <Link
                    className="btn btn-blue me-2 font-primary"
                    to="/auth?mode=login"
                    style={{ width: "80px" }}
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-blue font-primary"
                    to="/auth?mode=register"
                  >
                    Register
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
