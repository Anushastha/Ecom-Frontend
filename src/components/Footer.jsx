import React from "react";
import "../styles/footer.css";
import { Link } from "react-router-dom";
import "../styles/tailwind.css";

const Footer = () => {
  return (
    <>
      <div
        style={{
          background: "white",
          paddingBottom: "20px",
          paddingTop: "10px",
          zIndex: "0",
          position: "relative",
        }}
      >
        <div>
          <img
            className="footer-image-container"
            src="/assets/images/footerImage.png"
            alt="img"
            style={{
              height: "280px",
              zIndex: "1",
              position: "absolute",
              bottom: "25px",
              right: "20px",
            }}
          />
        </div>
        <div
          style={{
            paddingTop: "20px",
            marginBottom: "20px",
            left: "50%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="gradient-container"
            style={{
              height: "max-content",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
            }}
          >
            <img
              src="/assets/images/logo.png"
              alt="logo"
              className="footer-logo"
              style={{
                height: "18vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <div
              className="container"
              style={{
                padding: "0px 50px",
                display: "flex",
                justifyContent: "center", // Center horizontally
                alignItems: "center", // Center vertically
                height: "100%",
              }}
            >
              <p
                className="font-secondary"
                style={{
                  width: "50vw",
                  textAlign: "left", // Center text horizontally
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                Simplify your college search journey, providing a seamless
                experience to help you discover the perfect fit for your future
                aspirations and academic goals.
                <br />
                Access your account or create a new one to unlock more features.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Link
                className="btn btn-blue font-primary me-1"
                style={{ width: "100px", height: "30px", fontSize: "0.9rem" }}
                to={`/auth?mode=login`}
              >
                Login
              </Link>
              <Link
                className="btn btn-blue font-primary"
                style={{
                  width: "100px",
                  height: "30px",
                  fontSize: "0.9rem",
                }}
                to={`/auth?mode=register`}
              >
                Register
              </Link>
            </div>
          </div>
        </div>

        <div
          style={{
            paddingLeft: "12vw",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <div>
              <p
                className="font-primary"
                style={{
                  fontSize: "25px",
                  marginRight: "15vw",
                }}
              >
                Links
              </p>
              <ul
                className="font-secondary"
                style={{
                  lineHeight: "40px",
                  fontSize: "15px",
                }}
              >
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/user/colleges"}>Colleges</Link>
                </li>
                <li>
                  <Link to={"/user/courses"}>Courses</Link>
                </li>
                <li>
                  <Link to={"/user/blogs"}>Blogs</Link>
                </li>
              </ul>
            </div>
            <div>
              <p
                className="font-primary"
                style={{
                  fontSize: "25px",
                }}
              >
                Contact
              </p>
              <ul
                className="font-secondary"
                style={{
                  lineHeight: "40px",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                <li>collegeseek@gmail.com</li>
                <li>9841000000</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
