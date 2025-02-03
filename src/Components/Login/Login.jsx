import "./Login.css";
import facebook from "../../assets/facebook3.svg";
import apple from "../../assets/apple_icon.svg";
import google from "../../assets/google3.svg";
import eye1 from "../../assets/eye1.svg";
import eye2 from "../../assets/eye2.svg";
import { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../../context/ContextApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { decodeJWT } from "../../utils/decodeJWTPayload";
import axios from "axios";
import { getUserInfo } from "../../utils/fetchUserInfo";

const Login = () => {
  // State variables
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);

  // Hooks
  const navigate = useNavigate();
  const { UpdateUser } = useContext(ContextProvider);

  // Function to handle user authentication
  const FetchUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const jsonData = await response.json();

      if (response.ok) {
        const { access } = jsonData;
        if (access) {
          Cookies.set("token", access);
          const userPayloadData = decodeJWT(access);
          getUserInfo(userPayloadData.user_id);

          // console.log(localStorage.getItem("userData"));
          // UpdateUser(userDta);

          // Redirect after login
          navigate("/");
        } else {
          setError("Invalid Email or Password");
        }
      } else {
        throw new Error("Authentication failed");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later.");
    }
  };

  // Handle input changes
  const HandleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle password visibility
  const HandleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle form submission
  const HandleSubmit = () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
    } else {
      setError(false);
      FetchUser();
    }
  };

  return (
    <section className="loginPage">
      <div className="title">
        <h1>Login</h1>
        <h1>Hi! Welcome</h1>
      </div>

      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
          HandleSubmit(e);
        }}
      >
        <div className="input">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="text"
            placeholder=""
            name="email"
            value={formData.email}
            onChange={(e) => HandleInput(e)}
          />
        </div>

        <div className="input">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder=""
            name="password"
            value={formData.password}
            onChange={(e) => HandleInput(e)}
          />
          <img
            className="showPassword"
            src={showPassword ? eye2 : eye1}
            onClick={() => {
              HandleShowPassword();
            }}
            alt=""
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Log In</button>
      </form>

      <p className="forget">Forgotten your password ?</p>
      <p className="signWith">
        <p>Or sign in with </p>
      </p>
      <div className="icons">
        <img src={apple} alt="" />
        <img src={google} alt="" />
        <img src={facebook} alt="" />
      </div>

      <div className="footer">
        <p>Don’t have an account ?</p>
        <h3 onClick={() => navigate("/signUp")}>Create an Account</h3>
      </div>
    </section>
  );
};

export default Login;
