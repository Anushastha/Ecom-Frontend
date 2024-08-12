import React, { useState } from "react";
import { changePassword } from "../../apis/Apis";
import "../../styles/tailwind.css";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await changePassword(
        { currentPassword, newPassword, confirmNewPassword },
        token
      );
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleNewPasswordVisibility = () =>
    setNewPasswordVisible(!newPasswordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

  return (
    <div
      className="container flex items-center justify-center min-h-screen"
      style={{
        overflow: "hidden",
        width: "max-content",
      }}
    >
      <div
        className="tw-bg-white tw-p-8 tw-max-w-4xl tw-mx-4 md:tw-mx-auto tw-relative"
        style={{
          marginTop: "60px",
        }}
      >
        <p className="tw-font-primary tw-text-black tw-text-center tw-text-3xl tw-mb-5">
          <u>Change Password</u>
        </p>
        <form
          onSubmit={handleSubmit}
          id="info"
          className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-p-4 tw-mx-10"
        >
          <div id="password-details">
            <div className="tw-mb-4">
              <p className="tw-text-black tw-font-secondary">
                Enter your current password
              </p>
              <div className="tw-flex tw-items-center">
                <input
                  className="tw-border-none focus:tw-outline-none tw-text-black"
                  style={{
                    backgroundColor: "#F3F4F4",
                    border: "none",
                    marginRight: "2px",
                    padding: "3px 10px",
                    width: "250px",
                  }}
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Old Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <div
                  className="bg-gray-100"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F3F4F4",
                    padding: "5px",
                  }}
                  onClick={togglePasswordVisibility}
                >
                  <img
                    src={`/assets/svg/${
                      passwordVisible ? "eye" : "eye-crossed"
                    }.svg`}
                    alt="eye"
                    style={{
                      height: "20px",
                      cursor: "pointer",
                    }}
                  />{" "}
                </div>
              </div>
            </div>
            <div className="tw-mb-4">
              <p className="tw-text-black tw-font-secondary">
                Enter new Password
              </p>
              <div className="tw-flex tw-items-center">
                <input
                  className="tw-border-none tw-p-2 focus:tw-outline-none tw-text-black"
                  style={{
                    backgroundColor: "#F3F4F4",
                    border: "none",
                    marginRight: "2px",
                    padding: "3px 10px",
                    width: "250px",
                  }}
                  type={newPasswordVisible ? "text" : "password"}
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <div
                  className="bg-gray-100"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F3F4F4",
                    padding: "5px",
                  }}
                  onClick={toggleNewPasswordVisibility}
                >
                  <img
                    src={`/assets/svg/${
                      newPasswordVisible ? "eye" : "eye-crossed"
                    }.svg`}
                    alt="eye"
                    style={{
                      height: "20px",
                      cursor: "pointer",
                    }}
                  />{" "}
                </div>
              </div>
            </div>
            <div className="tw-mb-4">
              <p className="tw-text-black tw-font-secondary">
                Confirm new password
              </p>
              <div className="tw-flex tw-items-center">
                <input
                  className="tw-border-none tw-p-2 focus:tw-outline-none tw-text-black"
                  style={{
                    backgroundColor: "#F3F4F4",
                    border: "none",
                    marginRight: "2px",
                    padding: "3px 10px",
                    width: "250px",
                  }}
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
                <div
                  className="bg-gray-100"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F3F4F4",
                    padding: "5px",
                  }}
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <img
                    src={`/assets/svg/${
                      confirmPasswordVisible ? "eye" : "eye-crossed"
                    }.svg`}
                    alt="eye"
                    style={{
                      height: "20px",
                      cursor: "pointer",
                    }}
                  />{" "}
                </div>
              </div>
            </div>
          </div>
          <div>
            <button className="btn btn-black font-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
