/* eslint-disable react/prop-types */
import { data } from "react-router-dom";
import "./Otp.css";
import Cookies from "js-cookie";
import { decodeJWT } from "../../utils/decodeJWTPayload";
import { getUserInfo } from "../../utils/fetchUserInfo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Hooks
// const navigate = useNavigate();

const Otp = ({ setShowOtp, HandleSubmit, email }) => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [error, setError] = useState(null);

  const HandleChange = (e, index) => {
    if (isNaN(e.target.value) || e.target.value == "") return false;
    setOtp([
      ...otp.map((data, indx) => (index === indx ? e.target.value : data)),
    ]);
    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  const resendOTP = async (email) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/otp/request/", {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(email),
      });

      if (response.ok) {
        const json_data = await response.json();

        console.log(email);
        console.log("OTP data after submission: ", json_data.token);

        localStorage.setItem("token", json_data.token);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Verifying user email
  const sentOtp = async (new_otp_code) => {
    const token = localStorage.getItem("token");
    const data = {
      otp: new_otp_code,
      token: token,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/account/verify/",
        {
          headers: {
            "Content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const jsonData = await response.json();

      if (response.ok) {
        const { access } = jsonData;
        if (access) {
          Cookies.set("token", access);
          console.log("The auth token has been set successfully");
          localStorage.removeItem("token");
          const userPayloadData = decodeJWT(access);
          getUserInfo(userPayloadData.user_id);
          navigate("/");
        }
      }
    } catch (err) {
      console.log("API Error: ", err);
    }

    console.log("New Otp data", new_otp_code);
  };

  const HandleSubmitOtp = () => {
    const otp_code = otp.join("");
    const token = localStorage.getItem("token");
    // send the otp code along with the jwt token
    if (otp_code && token) {
      setError(null);
      sentOtp(otp_code, token);
    } else {
      setError("Invalid OTP Try Again .");
      otp[0].focus();
    }
    setOtp(new Array(4).fill(""));
    console.log("OTP from Otp.jsx: ", otp);
  };

  const HandlePre = (e, index) => {
    setOtp([...otp.map((data, indx) => (index === indx ? "" : data))]);
    if (e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };
  return (
    <div className="otp">
      <div className="back" onClick={() => setShowOtp()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M380.6 81.7c7.9 15.8 1.5 35-14.3 42.9L103.6 256 366.3 387.4c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3l-320-160C6.8 279.2 0 268.1 0 256s6.8-23.2 17.7-28.6l320-160c15.8-7.9 35-1.5 42.9 14.3z" />
        </svg>
      </div>
      <div className="title">
        <h1>Sign up</h1>
        <h1>Verify OTP</h1>
        <p>Please enter the code we sent you to email</p>
      </div>
      <div className="input">
        {otp.map((data, index) => {
          return (
            <input
              key={index}
              value={data}
              type="text"
              maxLength={1}
              onChange={(e) => HandleChange(e, index)}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  HandlePre(e, index);
                }
              }}
            />
          );
        })}
      </div>
      <div className="info">
        <button type="submit" onClick={() => resendOTP({ email })}>
          Didn’t Receive OTP ? <span>Resend Code</span>
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      <button onClick={() => HandleSubmitOtp()}>Verify</button>
    </div>
  );
};

export default Otp;
