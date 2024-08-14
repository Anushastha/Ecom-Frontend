import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updatePasswordApi } from "../apis/Apis";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/passStrength.css"; // Ensure this file contains your CSS styles

const evaluatePasswordStrength = (password) => {
  const lengthCriteria = password.length >= 8 && password.length <= 12;
  const numberCriteria = /\d/.test(password);
  const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (lengthCriteria && numberCriteria && specialCharCriteria) {
    return { strength: "Strong", className: "strong" };
  } else if (lengthCriteria && (numberCriteria || specialCharCriteria)) {
    return { strength: "Moderate", className: "moderate" };
  } else {
    return { strength: "Weak", className: "weak" };
  }
};

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("Weak");
  const [passwordStrengthClass, setPasswordStrengthClass] = useState("weak");
  const navigate = useNavigate();
  const location = useLocation();

  const userEmail = location.state && location.state.User_email;

  useEffect(() => {
    const { strength, className } = evaluatePasswordStrength(newPassword);
    setPasswordStrength(strength);
    setPasswordStrengthClass(className);
  }, [newPassword]);

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
              <div className="tw-flex tw-items-center">
                <input
                  type={newPasswordVisible ? "text" : "password"}
                  className="tw-border-none tw-p-2 focus:tw-outline-none"
                  value={newPassword}
                  onChange={handleChangePassword}
                  placeholder="Password"
                  minLength={8}
                  maxLength={12}
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
            <div className="tw-mb-4 tw-mt-4">
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
                  {confirmPasswordVisible ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            className="btn btn-black tw-text-sm tw-mt-3 font-primary"
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
