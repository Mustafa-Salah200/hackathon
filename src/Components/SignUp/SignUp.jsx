import "./SignUp.css";
import facebook from "../../assets/facebook3.svg";
import apple from "../../assets/apple_icon.svg";
import google from "../../assets/google3.svg";
import eye1 from "../../assets/eye1.svg";
import eye2 from "../../assets/eye2.svg";
import file_icon from "../../assets/file_icon.svg";
import Otp from "../Otp/Otp";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
    password: "",
    profile_picture: "",
    confirmPassword: "",
    image: null, // this will be set with file name once uploaded
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const SubmitUserInfo = async () => {
    const formdata = new FormData();
    formdata.append("username", formData.name);
    formdata.append("email", formData.email);
    formdata.append("password", formData.password);
    formdata.append("phone_number", formData.phone);
    formdata.append("profile_picture", file); // Attach the file

    try {
      const response = await fetch("http://localhost:8000/account/user/", {
        method: "POST",
        body: formdata, // Sending the formdata directly
      });

      const json = await response.json();

      if (response.ok) {
        console.log("Response from account/user/", json.token);
        localStorage.setItem("token", json.token);
        console.log("Token set successfully");

        // HandleUpload(json.data._id);
      } else {
        throw new Error("Failed to create user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const HandleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const HandleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const HandleSubmit = () => {
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === "" ||
      formData.phone === "" ||
      !file
    ) {
      setError("Fill all the fields and upload a file.");
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError("The password must be the same as ConfirmPassword");
      } else {
        setFormData({ ...formData, image: file.name });
        setEmail(formData.email);
        setError(false);
        SubmitUserInfo(); // Call the API to create the user and upload the file
        setShowOtp(true);
      }
    }
  };
  return showOtp ? (
    <Otp
      HandleSubmit={SubmitUserInfo}
      setShowOtp={() => setShowOtp(false)}
      email={email}
    />
  ) : (
    <section className="signUp">
      <div className="title">
        <h1>Create Account</h1>
        <h1>
          Fill your information below or register with your social account
        </h1>
      </div>

      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
          HandleSubmit(e);
        }}
      >
        <div className="input">
          <label htmlFor="email">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => HandleInput(e)}
          />
        </div>

        <div className="input">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
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

        <div className="input">
          <label htmlFor="password2">Confirm Password</label>
          <input
            id="password2"
            type={showPassword ? "text" : "password"}
            placeholder=""
            name="confirmPassword"
            value={formData.confirmPassword}
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

        <div className="input">
          <label htmlFor="number">Phone</label>
          <input
            id="number"
            type="number"
            placeholder=""
            name="phone"
            value={formData.phone}
            onChange={(e) => HandleInput(e)}
          />
        </div>
        <div className="file-upload">
          <img src={file_icon} alt="" />
          <input
            type="file"
            id="upload"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="upload">Profile Image</label>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>

      <p className="signWith">
        <p>Or sign in with </p>
      </p>
      <div className="icons">
        <img src={apple} alt="" />
        <img src={google} alt="" />
        <img src={facebook} alt="" />
      </div>
    </section>
  );
};

export default SignUp;
