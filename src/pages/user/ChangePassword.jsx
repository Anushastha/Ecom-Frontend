import React, { useState, useEffect } from "react";
import { changePassword } from "../../apis/Apis";
import "../../styles/tailwind.css";
import "../../styles/passStrength.css";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordStrengthClass, setPasswordStrengthClass] = useState("");
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const evaluatePasswordStrength = (password) => {
    const lengthCriteria = password.length >= 8;
    const numberCriteria = /\d/.test(password);
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (lengthCriteria && numberCriteria && specialCharCriteria) {
      setPasswordStrength("Strong");
      setPasswordStrengthClass("strong");
    } else if (lengthCriteria && (numberCriteria || specialCharCriteria)) {
      setPasswordStrength("Moderate");
      setPasswordStrengthClass("moderate");
    } else {
      setPasswordStrength("Weak");
      setPasswordStrengthClass("weak");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Initialize an array to store error messages
    const errorMessages = [];

    // Check if all fields are filled
    if (!currentPassword.trim()) {
      errorMessages.push("Current password is required.");
    }
    if (!newPassword.trim()) {
      errorMessages.push("New password is required.");
    }
    if (!confirmNewPassword.trim()) {
      errorMessages.push("Confirm new password is required.");
    }

    // Validate new password strength
    if (newPassword && !passwordStrengthClass) {
      errorMessages.push("New password does not meet the required criteria.");
    }

    // Validate password match
    if (
      newPassword &&
      confirmNewPassword &&
      newPassword !== confirmNewPassword
    ) {
      errorMessages.push("New passwords do not match.");
    }

    // If there are any errors, display all the error messages using toast.error()
    if (errorMessages.length > 0) {
      errorMessages.forEach((message) => {
        toast.error(message);
      });
      return; // Prevent form submission
    }

    try {
      const token = localStorage.getItem("token");
      const response = await changePassword(
        { currentPassword, newPassword, confirmNewPassword },
        token
      );
      toast.success(response.message);
      navigate("/user/dashboard");
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
              <p className="tw-text-black tw-font-secondary tw-font-bold">
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
                />
                <div
                  className="bg-gray-100"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F3F4F4",
                    padding: "5px",
                    cursor: "pointer",
                  }}
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </div>
              </div>
            </div>
            <div className="tw-mb-4">
              <p className="tw-text-black tw-font-secondary tw-font-bold">
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
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    evaluatePasswordStrength(e.target.value); // Evaluate password strength on change
                  }}
                />
                <div
                  className="bg-gray-100"
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
                  {newPasswordVisible ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </div>
              </div>
              {newPassword && (
                <div className="password-strength-meter">
                  <div
                    className={`password-strength-bar ${passwordStrengthClass}`}
                  ></div>
                  <span
                    className={`password-strength-text ${passwordStrengthClass}`}
                  >
                    Password Strength: {passwordStrength}
                  </span>
                </div>
              )}
            </div>
            <div className="tw-mb-4">
              <p className="tw-text-black tw-font-secondary tw-font-bold">
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
                />
                <div
                  className="bg-gray-100"
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
                  {confirmPasswordVisible ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
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
