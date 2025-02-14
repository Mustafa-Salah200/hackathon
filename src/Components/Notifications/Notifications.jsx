/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Notifications.css";
const Notifications = ({ setShowPage }) => {
  const [sms, setSms] = useState(false);
  // const [email, setEmail] = useState(false);
  const [pushNotification, setpushNotification] = useState(false);

  // const updatePreference = async () => {
  //   console.log("Updating user preference")
  // }

  return (
    <div className="notifications">
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
        <h2>Notifications</h2>
      </div>
      <div className="content">
        <div className="">
          <h2>SMS</h2>
          <p
            onClick={() => setSms(!sms)}
            style={
              sms
                ? {
                    backgroundColor: "#D9D9D9",
                  }
                : {
                    backgroundColor: "#333",
                  }
            }
          >
            <span
              style={
                sms
                  ? {
                      left: "5px",
                    }
                  : {
                      left: "35px",
                    }
              }
            ></span>
          </p>
        </div>

        {/* <div className="">
          <h2>Email</h2>
          <p
            onClick={() => setEmail(!email)}
            style={
              email
                ? {
                    backgroundColor: "#D9D9D9",
                  }
                : {
                    backgroundColor: "#333",
                  }
            }
          >
            <span
              style={
                email
                  ? {
                      left: "5px",
                    }
                  : {
                      left: "35px",
                    }
              }
            ></span>
          </p>
        </div> */}

        <div className="">
          <h2>Push Notification</h2>
          <p
            onClick={() => setpushNotification(!pushNotification)}
            style={
              pushNotification
                ? {
                    backgroundColor: "#D9D9D9",
                  }
                : {
                    backgroundColor: "#333",
                  }
            }
          >
            <span
              style={
                pushNotification
                  ? {
                      left: "5px",
                    }
                  : {
                      left: "35px",
                    }
              }
            ></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
