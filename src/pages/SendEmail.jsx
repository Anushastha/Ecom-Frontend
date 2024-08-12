import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendEmailApi } from "../apis/Apis";
import "../styles/tailwind.css";
import { FaEnvelope } from "react-icons/fa";

const SendEmail = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };

    sendEmailApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/resetCode", { state: { User_email: email } });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Server Error");
      });
  };

  return (
    <>
      <div className="row vh-100 d-flex align-items-center justify-content-center">
        <div className="col-md-5 bg-white p-5">
          <p className="text-center my-4 font-primary tw-text-4xl">
            <u>Forgot Password?</u>
          </p>
          <form
            className="px-3"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>Enter your email address to get a reset code</p>
            <div className="tw-flex tw-items-center tw-mt-4">
              <div className="tw-mb-4">
                <b className="tw-text-blue tw-font-secondary tw-mt-5">
                  Enter email address
                </b>
                <div className="tw-flex tw-items-center">
                  <input
                    className="tw-border-none tw-p-2 focus:tw-outline-none"
                    onChange={changeEmail}
                    style={{
                      backgroundColor: "#F3F4F4",
                      color: "#A8AAAA",
                      border: "none",
                      marginRight: "2px",
                      padding: "3px 10px",
                      width: "280px",
                    }}
                  />
                  <div
                    className="tw-bg-gray-100"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#F3F4F4",
                      padding: "5px",
                    }}
                  >
                    <FaEnvelope size={20} />
                  </div>
                </div>
              </div>
            </div>
            <button
              className="btn btn-black tw-text-sm tw-mt-3 font-primary"
              type="submit"
              onClick={handleSubmit}
            >
              Send Code
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SendEmail;
