import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Components from "../Components";
import "../styles/auth.css";
import { loginApi, registerApi } from "../apis/Apis";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

function LoginRegister() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode");
  const initialSignInState = mode === "login";
  const [signIn, setSignIn] = useState(initialSignInState);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordStrengthClass, setPasswordStrengthClass] = useState("");
  const [timerState, setTimerState] = useState(null);

  // const [errors, setErrors] = useState({
  //   email: "",
  //   phoneNumber: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-register-body");

    return () => {
      document.body.classList.remove("login-register-body");
    };
  }, []);

  const changeFullName = (e) => setFullName(e.target.value);
  const changeEmail = (e) => setEmail(e.target.value);

  const changePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    evaluatePasswordStrength(newPassword);
  };

  const changeConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const changePhoneNumber = (e) => setPhoneNumber(e.target.value);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhoneNumber = (number) => /^\d{10}$/.test(number);
  const isValidPassword = (password) =>
    password.length >= 8 && password.length <= 12;

  const evaluatePasswordStrength = (password) => {
    const lengthCriteria = password.length >= 8 && password.length <= 12;
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

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Initialize an array to store error messages
    const errorMessages = [];

    // Check if all fields are empty
    if (
      !fullName.trim() &&
      !email.trim() &&
      !phoneNumber.trim() &&
      !password.trim() &&
      !confirmPassword.trim()
    ) {
      errorMessages.push("Please enter all fields.");
    } else {
      // Check if each field is filled and add the corresponding error message to the array
      if (!fullName.trim()) {
        errorMessages.push("Please enter your full name.");
      }
      if (!email.trim()) {
        errorMessages.push("Please enter your email.");
      }
      if (!phoneNumber.trim()) {
        errorMessages.push("Please enter your phone number.");
      }
      if (!password.trim()) {
        errorMessages.push("Please enter your password.");
      }
      if (!confirmPassword.trim()) {
        errorMessages.push("Please confirm your password.");
      }

      // Validate each field and add corresponding error messages to the array
      if (email.trim() && !isValidEmail(email)) {
        errorMessages.push("Invalid email format.");
      }
      if (phoneNumber.trim() && !isValidPhoneNumber(phoneNumber)) {
        errorMessages.push("Phone number must be 10 digits.");
      }
      if (password.trim() && !isValidPassword(password)) {
        errorMessages.push(
          "Password must be between 8 and 12 characters long."
        );
      }
      if (password && confirmPassword && password !== confirmPassword) {
        errorMessages.push("Passwords do not match.");
      }
    }

    // If there are any errors, display all the error messages using toast.error()
    if (errorMessages.length > 0) {
      errorMessages.forEach((message) => {
        toast.error(message);
      });
      return; // Prevent form submission
    }

    const data = {
      fullName,
      email,
      password,
      confirmPassword,
      phoneNumber,
    };

    registerApi(data)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/verifyEmail", { state: { User_email: email } });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Internal Server Error!");
      });
  };

  const handlePasswordExpiry = () => {
    if (
      window.confirm(
        "Your password has expired. Would you like to change it now?"
      )
    ) {
      navigate("/changeExpiredPassword"); // Redirect to change password page
    } else {
      toast.info("You will be redirected to the login page.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        navigate("/auth?mode=login"); // Redirect to login page after the toast message
      }, 3000); // Wait for the toast to finish before redirecting
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const errorMessages = [];

    // Validate the email field
    if (!email.trim()) {
      errorMessages.push("Email is required.");
    } else if (!isValidEmail(email)) {
      errorMessages.push("Invalid email format.");
    }

    // Validate the password field
    if (!password.trim()) {
      errorMessages.push("Password is required.");
    }

    // Function to validate email format
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    // Display validation errors
    if (errorMessages.length > 0) {
      errorMessages.forEach((message) => toast.error(message));
      return; // Prevent form submission
    }

    // Prepare data for API request
    const data = { email, password };

    try {
      const res = await loginApi(data);

      if (!res.data.success) {
        if (res.data.message.includes("locked")) {
          const lockUntil = new Date(res.data.lockUntil);
          startLockoutTimer(lockUntil);
          return;
        } else {
          toast.error(res.data.message);
        }
        return;
      }

      if (res.data.passwordExpired) {
        toast.error("Your password has expired. Please change your password.");
        handlePasswordExpiry();
        return;
      }

      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      const userData = JSON.stringify(res.data.userData);
      localStorage.setItem("user", userData);
      navigate(res.data.isAdmin ? "/admin/dashboard" : "/user/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Server Error!");
    }
  };

  // Function to start the lockout timer
  const startLockoutTimer = (lockUntil) => {
    const currentTime = new Date();
    const lockTimeLeft = lockUntil - currentTime;

    if (lockTimeLeft > 0) {
      const timerInterval = setInterval(() => {
        const timeLeft = new Date(lockUntil - new Date());
        if (timeLeft > 0) {
          const minutes = timeLeft.getUTCMinutes();
          const seconds = timeLeft.getUTCSeconds();
          setTimerState({ minutes, seconds });
        } else {
          clearInterval(timerInterval);
          setTimerState(null);
          window.location.reload();
        }
      }, 1000);
    }
  };

  const styles = {
    timerContainer: {
      position: "absolute",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      padding: "5px 10px",
      borderRadius: "5px",
      zIndex: 1000,
    },
    timerText: {
      color: "#fff",
      fontSize: "16px",
    },
  };

  const toggleSignIn = (value) => setSignIn(value);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleBackButtonClick = () => {
    navigate("/");
  };

  return (
    <Components.Wrapper>
      <div
        onClick={handleBackButtonClick}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          cursor: "pointer",
        }}
      >
        <FaArrowLeft size={25} />
      </div>

      {/* Timer display */}
      {timerState && (
        <div style={styles.timerContainer}>
          <p
            style={styles.timerText}
            className="font-secondary tw-font-bold tw-text-center p-2"
          >
            Your account is locked due to multiple failed login attempts.
            <br /> Please try again in
            {`${timerState.minutes}:${timerState.seconds < 10 ? "0" : ""}${
              timerState.seconds
            }`}
          </p>
        </div>
      )}

      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={handleRegisterSubmit}>
            <Components.Title>Create Account</Components.Title>
            <Components.Subtitle>
              Create your account now and explore
            </Components.Subtitle>

            <Components.Line>Enter full name</Components.Line>
            <Components.InputContainer>
              <Components.Input type="text" onChange={changeFullName} />
              <Components.IconWrapper>
                <FaUser size={20} />
              </Components.IconWrapper>
            </Components.InputContainer>

            <Components.Line>Enter email</Components.Line>
            <Components.InputContainer>
              <Components.Input type="text" onChange={changeEmail} />
              <Components.IconWrapper>
                <FaEnvelope size={20} />
              </Components.IconWrapper>
            </Components.InputContainer>

            <Components.Line>Enter password</Components.Line>
            <Components.InputContainer>
              <Components.Input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                onChange={changePassword}
              />
              <Components.IconWrapper
                onClick={togglePasswordVisibility}
                style={{
                  cursor: "pointer",
                }}
              >
                {passwordVisible ? (
                  <FaEye size={23} />
                ) : (
                  <FaEyeSlash size={23} />
                )}
              </Components.IconWrapper>
            </Components.InputContainer>

            {password && (
              <Components.PasswordStrengthMeter>
                <Components.PasswordStrengthBar
                  strength={passwordStrengthClass}
                />
                <Components.PasswordStrengthText
                  className="font-secondary"
                  style={{ textAlign: "left" }}
                  strength={passwordStrengthClass}
                >
                  Password Strength: {passwordStrength}
                </Components.PasswordStrengthText>
              </Components.PasswordStrengthMeter>
            )}

            <Components.InputContainer>
              <Components.Input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm password"
                onChange={changeConfirmPassword}
              />
              <Components.IconWrapper
                onClick={toggleConfirmPasswordVisibility}
                style={{
                  cursor: "pointer",
                }}
              >
                {confirmPasswordVisible ? (
                  <FaEye size={23} />
                ) : (
                  <FaEyeSlash size={23} />
                )}
              </Components.IconWrapper>
            </Components.InputContainer>

            <Components.Line>Enter phone number</Components.Line>
            <Components.InputContainer>
              <Components.Input type="number" onChange={changePhoneNumber} />
              <Components.IconWrapper>
                <FaPhone size={20} />
              </Components.IconWrapper>
            </Components.InputContainer>

            <Components.Button type="submit">Register</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form onSubmit={handleLoginSubmit}>
            <Components.Title>Login</Components.Title>
            <Components.Subtitle
              style={{
                marginBottom: "30px",
              }}
            >
              Let's get started! Sign in to unlock all the features
            </Components.Subtitle>

            <Components.Line>Enter email</Components.Line>
            <Components.InputContainer>
              <Components.Input type="text" onChange={changeEmail} />
              <Components.IconWrapper>
                <FaEnvelope size={20} />
              </Components.IconWrapper>
            </Components.InputContainer>

            <Components.Line>Enter password</Components.Line>
            <Components.InputContainer
              style={{
                marginBottom: "20px",
              }}
            >
              <Components.Input
                type={passwordVisible ? "text" : "password"}
                onChange={changePassword}
              />
              <Components.IconWrapper
                onClick={togglePasswordVisibility}
                style={{
                  cursor: "pointer",
                }}
              >
                {passwordVisible ? (
                  <FaEye size={23} />
                ) : (
                  <FaEyeSlash size={23} />
                )}
              </Components.IconWrapper>
            </Components.InputContainer>

            <Components.LoginBottomContainer>
              <Components.Anchor href="/sendEmail">
                Forgot your password?
              </Components.Anchor>
            </Components.LoginBottomContainer>

            <Components.Button type="submit">Login</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph
                style={{
                  fontFamily: "Lato, sans-serif",
                  fontSize: "16px",
                  width: "300px",
                  fontWeight: "500",
                }}
              >
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton
                onClick={() => toggleSignIn(true)}
                style={{
                  marginBottom: "20px",
                }}
              >
                Login
              </Components.GhostButton>
              <FaArrowLeft size={20} />
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph
                style={{
                  fontFamily: "Lato, sans-serif",
                  fontSize: "16px",
                  width: "300px",
                  fontWeight: "500",
                }}
              >
                Enter your personal details and start your journey with us
              </Components.Paragraph>
              <Components.GhostButton
                onClick={() => toggleSignIn(false)}
                style={{
                  marginBottom: "20px",
                }}
              >
                Register
              </Components.GhostButton>
              <FaArrowRight size={25} />
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </Components.Wrapper>
  );
}

export default LoginRegister;
