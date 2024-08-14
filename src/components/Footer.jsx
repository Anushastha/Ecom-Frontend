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
          <div
            className="footer-image-container"
            style={{
              backgroundImage: `url('/assets/images/footerImage.png')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right",
              height: "280px",
              zIndex: "1",
              position: "absolute",
              bottom: "25px",
              right: "20px",
              width: "100%",
            }}
            alt="footer image"
          ></div>
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
            <div
              className="footer-logo"
              style={{
                backgroundImage: `url('/assets/images/logo.png')`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "18vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              alt="logo"
            ></div>

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
                className="font-secondary tw-text-white"
                style={{
                  width: "50vw",
                  textAlign: "left", // Center text horizontally
                  fontSize: "0.8rem",
                }}
              >
                Discover a world of premium beauty and personal care products
                designed to enhance your natural glow. Explore our exclusive
                range for personalized, high-quality essentials that bring out
                the best in you.
                <br />
                <br />
                Access your account or create a new one to shop for more.
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
                className="btn btn-outline-light font-primary me-1"
                style={{ width: "100px", height: "35px", fontSize: "0.9rem" }}
                to={`/auth?mode=login`}
              >
                Login
              </Link>
              <Link
                className="btn btn-outline-light font-primary"
                style={{
                  width: "100px",
                  height: "35px",
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
                  <Link to={"/user/dashboard"}>Products</Link>
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
                  fontSize: "15px",
                }}
              >
                <li>lushbeauty@gmail.com</li>
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
