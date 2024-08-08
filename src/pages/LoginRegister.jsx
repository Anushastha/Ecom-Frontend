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

  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-register-body");

    return () => {
      document.body.classList.remove("login-register-body");
    };
  }, []);

  const changeFullName = (e) => setFullName(e.target.value);
  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  const changeConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const changePhoneNumber = (e) => setPhoneNumber(e.target.value);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhoneNumber = (number) => /^\d{10}$/.test(number);
  const isValidPassword = (password) => password.length >= 8;

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast.error("Invalid email format.");
      return;
    }
    if (!isValidPhoneNumber(phoneNumber)) {
      toast.error("Phone number must be 10 digits.");
      return;
    }
    if (!isValidPassword(password)) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
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
          window.location.reload();
          navigate("/auth?mode=login");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Internal Server Error!");
      });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const data = { email, password };

    loginApi(data)
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.token);
          // const isAdmin = res.data.isAdmin;
          const convertedJson = JSON.stringify(res.data.userData);
          localStorage.setItem("user", convertedJson);

          navigate(res.data.isAdmin ? "/admin/colleges" : "/user/colleges");

          // if (isAdmin) {
          //   navigate("/admin/colleges");
          // } else {
          //   navigate("/user/colleges");
          // }
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Server Error!");
      });
  };

  const toggleSignIn = (value) => setSignIn(value);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

  return (
    <Components.Wrapper>
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
