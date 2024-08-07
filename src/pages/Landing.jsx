import React from "react";
import "../scss/customs.scss";
import { Link } from "react-router-dom";
import "../styles/tailwind.css";

const Landing = () => {
  return (
    <>
      <div className="col">
        <div
          className="container"
          style={{
            marginTop: "30vh",
            marginBottom: "80px",
          }}
        >
          <div className="row align-items-center background-light">
            <div className="col-md-6 mb-4">
              <h1
                className="font-primary font-bold mb-4 w-full text-center md:mb-16"
                style={{
                  fontSize: "55px",
                }}
              >
                CollegeSeek
              </h1>
              <div className="flex items-center mb-4">
                <p
                  className="font-secondary"
                  style={{ textAlign: "justify", fontSize: "20px" }}
                >
                  <b>CollegeSeek</b> simplifies your college search journey,
                  providing a seamless experience to help you discover the
                  perfect fit for your future aspirations and academic goals.
                </p>
              </div>
              <div className="row items-center">
                <Link
                  to="/"
                  className="tw-text-black flex items-center font-secondary"
                  style={{ textDecoration: "none", fontSize: "20px" }}
                >
                  <u style={{ display: "flex" }}>
                    <b>Learn More</b>
                    <img
                      src="/assets/svg/info-circle.svg"
                      alt="Information"
                      style={{ marginLeft: "10px" }}
                    />
                  </u>
                </Link>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <img
                src="/assets/images/landing.png"
                alt="CollegeSeek"
                className="img-fluid"
              />
            </div>
          </div>
        </div>

        <div className="my-5">
          <div>
            <h1
              className="font-primary font-bold w-full text-center md:mb-16"
              style={{
                fontSize: "45px",
                marginBottom: "50px",
              }}
            >
              Explore Colleges
            </h1>
          </div>
          <div
            style={{
              margin: "3vh",
            }}
          >
            <div
              id="carouselExample"
              className="carousel slide mb-5"
              data-bs-ride="carousel"
              data-bs-interval="1500"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="/assets/images/college1.png"
                    alt="Slide 1"
                    className="d-block w-100"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="/assets/images/college2.png"
                    alt="Slide 2"
                    className="d-block w-100"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="/assets/images/college3.png"
                    alt="Slide 3"
                    className="d-block w-100"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span>Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
              >
                <span>Next</span>
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
              </button>
            </div>
          </div>
        </div>
        <div className="popular-courses">
          <div>
            <h1
              className="font-primary font-bold w-full text-center md:mb-16"
              style={{
                fontSize: "45px",
                marginTop: "150px",
                marginBottom: "50px",
              }}
            >
              Popular Courses
            </h1>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Landing;
