"use client"

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthPage() {
  const navigate = useNavigate();

  // State for signup inputs
  const [signupInput, setSignupInput] = useState({
    email: "",
    username: "",
    password: "",
  });
  const { email: suEmail, username, password: suPassword } = signupInput;

  const handleSignupOnChange = (e) => {
    const { name, value } = e.target;
    setSignupInput({ ...signupInput, [name]: value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3002/signup",
        { ...signupInput },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message, { position: "bottom-left" });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(data.message, { position: "bottom-left" });
      }
    } catch (error) {
      console.error(error);
    }
    setSignupInput({ email: "", username: "", password: "" });
  };

  // State for login inputs
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const { email: liEmail, password: liPassword } = loginInput;

  const handleLoginOnChange = (e) => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3002/login",
        { ...loginInput },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message, { position: "bottom-left" });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(data.message, { position: "bottom-left" });
      }
    } catch (error) {
      console.error(error);
    }
    setLoginInput({ email: "", password: "" });
  };

  // activePanel: "signup" or "login"
  const [activePanel, setActivePanel] = useState("signup");

  return (
    <div className="auth-page">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500&display=swap');

        .auth-page {
          display: flex;
          width: 100%;
          max-width: 900px;
          height: 600px;
          margin: 0 auto;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border-radius: 8px;
          overflow: hidden;
          font-family: 'Montserrat', sans-serif;
        }
        .auth-page .panel {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          height: 100%;
          transition: all 0.4s ease;
        }
        .auth-page .panel.left {
          background: #e6f7ff;
          color: #333;
        }
        .auth-page .panel.right {
          background: #d6eaff;
          color: #333;
          border-left: 1px solid #bbb;
        }
        .auth-page .panel h2 {
          font-size: 1.8rem;
          margin-bottom: 10px;
        }
        .auth-page .panel p {
          font-size: 1rem;
          margin-bottom: 20px;
          line-height: 1.5;
        }
        /* Form container styling */
        .auth-page .form-container {
          width: 100%;
          max-width: 300px;
          margin-top: 20px;
        }
        .auth-page .form-container h2 {
          font-size: 1.5rem;
          margin-bottom: 20px;
        }
        .auth-page .input-field {
          width: 100%;
          padding: 10px 15px;
          border: 1px solid #b3d4fc;
          border-radius: 8px;
          margin-bottom: 15px;
          font-size: 1rem;
          color: #333;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .auth-page .input-field:focus {
          border-color: #66afe9;
          outline: none;
          box-shadow: 0 0 0 2px rgba(102, 175, 233, 0.3);
        }
        .auth-page .submit-btn {
          border: none;
          border-radius: 4px;
          padding: 10px 20px;
          font-size: 1rem;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease;
          width: 100%;
          margin-bottom: 15px;
        }
        /* Signup button: white background with blue text; on hover: blue background with white text */
        .auth-page .submit-btn.signup {
          background: #fff;
          color: #007acc;
          border: 1px solid #007acc;
        }
        .auth-page .submit-btn.signup:hover {
          background: #007acc;
          color: #fff;
        }
        /* Login button: blue background with white text */
        .auth-page .submit-btn.login {
          background: #007acc;
          color: #fff;
        }
        .auth-page .submit-btn.login:hover {
          background: #005fa3;
        }
          .prompt-btn.signup-prompt {
          background: #fff;
          color: #007acc;
          border: 1px solid #007acc;
          border-radius: 4px;
          padding: 10px 20px;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease;
        }

        .prompt-btn.signup-prompt:hover {
          background: #007acc;
          color: #fff;
        }

        .auth-page .switch-btn {
          background: transparent;
          border: none;
          color: inherit;
          text-decoration: underline;
          cursor: pointer;
          margin-top: 15px;
          font-size: 0.9rem;
        }
        /* Styling for the prompt button in the right panel when inactive */
        .auth-page .prompt-btn.login-prompt {
          background: #007acc;
          color: #fff;
          border: 1px solid #007acc;
          border-radius: 4px;
          padding: 10px 20px;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .auth-page .prompt-btn.login-prompt:hover {
          background: #fff;
          color: #007acc;
        }
      `}</style>
      <div className="panel left">
        {activePanel === "signup" ? (
          <div className="form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input-field"
                value={suEmail}
                onChange={handleSignupOnChange}
                required
              />
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                className="input-field"
                value={username}
                onChange={handleSignupOnChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input-field"
                value={suPassword}
                onChange={handleSignupOnChange}
                required
              />
              <button type="submit" className="submit-btn signup">
                Sign Up
              </button>
            </form>
            <div className="switch-btn" onClick={() => setActivePanel("login")}>
              Already have an account? Login here.
            </div>
          </div>
        ) : (
          <>
            <h2>Don't have an account?</h2>
            <p>Join us for an enhanced trading experience.</p>
            <button onClick={() => setActivePanel("signup")} className="prompt-btn signup-prompt">
              Sign Up
            </button>

          </>
        )}
      </div>
      <div className="panel right">
        {activePanel === "login" ? (
          <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input-field"
                value={liEmail}
                onChange={handleLoginOnChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input-field"
                value={liPassword}
                onChange={handleLoginOnChange}
                required
              />
              <button type="submit" className="submit-btn login">
                Log In
              </button>
            </form>
            <div className="switch-btn" onClick={() => setActivePanel("signup")}>
              Don't have an account? Sign up here.
            </div>
          </div>
        ) : (
          <>
            <h2>Have an account?</h2>
            <p>Log in to access your account and manage your trades.</p>
            <button
              className="prompt-btn login-prompt"
              onClick={() => setActivePanel("login")}
            >
              Login
            </button>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
