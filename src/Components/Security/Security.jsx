/* eslint-disable react/prop-types */
import "./Security.css";
import eye1 from "../../assets/eye1.svg";
import eye2 from "../../assets/eye2.svg";
import { useContext, useState } from "react";
import { ContextProvider } from "../../context/ContextApi";
const Security = ({ setShowPage }) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState(null);

  const { user, UpdateUser } = useContext(ContextProvider);

  const HandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const FetchPassword = async () => {
    const response = await fetch(
      `http://127.0.0.1:4000/api/v1/users/${user._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"password": formData.newPassword }),
      }
    );
    const json = await response.json();
    if (response.ok) {
      console.log(json.data);
      
      UpdateUser(json.data);
      setTimeout(() => {
        setShowPage();
      }, 1500);
    }
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (user.password === formData.oldPassword) {
      setError({
        status: "success",
        message: "Your password has already been changed",
      });
      FetchPassword();
    } else {
      setError({
        status: "fail",
        message: "Your password should be the same as your old password",
      });
    }
  };
  return (
    <div className="security">
      <div className="header">
        <p className="back" onClick={() => setShowPage()}>
          <svg
            width="800px"
            height="800px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#000000"
              d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
            />
          </svg>
        </p>
        <h2>Security</h2>
      </div>
      <h3>Reset Password</h3>
      <form action="" onSubmit={(e) => HandleSubmit(e)}>
        <div className="input">
          <label htmlFor="password">Enter Old Password</label>
          <input
            id="password"
            type={showOldPassword ? "text" : "password"}
            name="oldPassword"
            defaultValue={formData.oldPassword}
            onChange={(e) => HandleChange(e)}
          />
          {showOldPassword ? (
            <img
              src={eye2}
              alt=""
              onClick={() => setShowOldPassword(!showOldPassword)}
            />
          ) : (
            <img
              src={eye1}
              alt=""
              onClick={() => setShowOldPassword(!showOldPassword)}
            />
          )}
        </div>
        <div className="input">
          <label htmlFor="password">Enter New Password</label>
          <input
            id="password"
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            defaultValue={formData.newPassword}
            onChange={(e) => HandleChange(e)}
          />
          {showNewPassword ? (
            <img
              src={eye2}
              alt=""
              onClick={() => setShowNewPassword(!showNewPassword)}
            />
          ) : (
            <img
              src={eye1}
              alt=""
              onClick={() => setShowNewPassword(!showNewPassword)}
            />
          )}
        </div>
        {error && (
          <p
            style={{
              margin: "10px 0",
              color: error.status === "fail" ? "red" : "#4CAF50",
            }}
          >
            {error.message}
          </p>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Security;
