import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updatePasswordApi } from "../apis/Apis";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const userEmail = location.state && location.state.User_email;

  const handleChangePassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if passwords match
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const response = await updatePasswordApi({
        email: userEmail,
        password: newPassword,
      });

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate("/auth?mode=login");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    }
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="row vh-100 d-flex align-items-center justify-content-center">
      <div className="col-md-5 bg-white p-5">
        <p className="text-center my-4 font-primary tw-text-blue tw-text-4xl">
          <u>Create New Password</u>
        </p>
        <form
          onSubmit={handleChangePasswordSubmit}
          className="px-3"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="tw-flex tw-items-center tw-flex-col">
            <div>
              <b className="tw-text-blue tw-font-secondary tw-mt-5">
                Enter password
              </b>
              <div className="tw-flex tw-items-center tw-mb-5">
                <input
                  type={newPasswordVisible ? "text" : "password"}
                  className="tw-border-none tw-p-2 focus:tw-outline-none"
                  value={newPassword}
                  onChange={handleChangePassword}
                  placeholder="Password"
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
                    cursor: "pointer",
                  }}
                  onClick={toggleNewPasswordVisibility}
                >
                  <img
                    src={
                      newPasswordVisible
                        ? "/assets/svg/eye.svg"
                        : "/assets/svg/eye-crossed.svg"
                    }
                    style={{
                      height: "20px",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="tw-mb-4">
              <b className="tw-text-blue tw-font-secondary tw-mt-5">
                Confirm new password
              </b>
              <div className="tw-flex tw-items-center">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  className="tw-border-none tw-p-2 focus:tw-outline-none"
                  value={confirmPassword}
                  onChange={handleChangeConfirmPassword}
                  placeholder="Confirm password"
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
                    cursor: "pointer",
                  }}
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <img
                    src={
                      confirmPasswordVisible
                        ? "/assets/svg/eye.svg"
                        : "/assets/svg/eye-crossed.svg"
                    }
                    style={{
                      height: "20px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            className="btn btn-blue tw-text-sm tw-mt-3 font-primary"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
