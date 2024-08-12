import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyCodeApi } from "../apis/Apis";
import "../styles/tailwind.css";
import { TbPasswordUser } from "react-icons/tb";

const ForgotPasswordCode = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const userEmail = location.state && location.state.User_email;

  const handleChangeCode = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();

    const data = {
      resetCode: verificationCode,
      email: userEmail,
    };

    verifyCodeApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/resetPassword", { state: { User_email: userEmail } });
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
            <u>Enter Verification Code</u>
          </p>
          <form
            className="px-3"
            onSubmit={handleVerifyCode}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                textAlign: "center",
              }}
            >
              A code has been sent to your email. Please check your email and
              enter the verification code
            </p>
            <div className="tw-flex tw-items-center">
              <div className="tw-mb-4 tw-mt-4">
                <b className="tw-text-blue tw-font-secondary">Enter code</b>
                <div className="tw-flex tw-items-center">
                  <input
                    className="tw-border-none tw-p-2 focus:tw-outline-none"
                    value={verificationCode}
                    onChange={handleChangeCode}
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
                    <TbPasswordUser size={20} />
                  </div>
                </div>
              </div>
            </div>
            <button
              className="btn btn-black tw-text-sm font-primary"
              type="submit"
              onSubmit={handleVerifyCode}
            >
              Verify
            </button>
            <p className="text-center mt-3 font-secondary">
              Didn't get code?{" "}
              <a
                href="/sendEmail"
                className="text-decoration-none text-blue tw-ml-2"
              >
                <b>Click here to resend</b>
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordCode;
