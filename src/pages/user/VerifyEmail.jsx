import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyEmailCodeApi } from "../../apis/Apis";
import { TbPasswordUser } from "react-icons/tb";

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const userEmail = location.state && location.state.User_email;

  const handleChangeCode = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    const data = { verificationCode, email: userEmail };

    verifyEmailCodeApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/auth?mode=login");
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
              A code has been sent to your email for verification. Please check
              your email and enter the email verification code
            </p>
            <div className="tw-flex tw-items-center">
              <div className="tw-mb-4 tw-mt-4">
                <b className="tw-font-secondary">Enter code</b>
                <div className="tw-flex tw-items-center">
                  <input
                    className="tw-border-none tw-p-2 focus:tw-outline-none"
                    value={verificationCode}
                    onChange={handleChangeCode}
                    style={{
                      backgroundColor: "#F3F4F4",
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
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
