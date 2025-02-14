/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import "./Settings.css";
import lock from "./images/lock.svg";
import language from "./images/language.svg";
import help from "./images/help.svg";
import notification from "./images/notifications.svg";
import logout from "./images/logout.svg";
import share from "./images/share.svg";
import Language from "../Language/Language";
import Feedback from "../FeedbackForm/Feedback";
import Notifications from "../Notifications/Notifications";
import Security from "../Security/Security";
import Share from "../Share/Share";
import { useNavigate } from "react-router-dom";
import { ContextProvider } from "../../context/ContextApi";
import Cookies from "js-cookie";

const Settings = ({ setSettings }) => {
  // Notification related
  const [sms, setSms] = useState(false);
  // const [email, setEmail] = useState(false);
  const [pushNotification, setpushNotification] = useState(false);
  //
  const [dark, setDark] = useState(false);
  const [showPage, setShowPage] = useState(false);
  const [lang, setLang] = useState("English");
  const [active, setActive] = useState(2);

  const [pageName, setPageName] = useState("");
  const { UpdateUser } = useContext(ContextProvider);
  // Hooks
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Endpoint: http://127.0.0.1:8000/auth/account/logout/

    const token = Cookies.get("token");
    if (token != undefined) {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/account/logout/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        Cookies.remove("token");
        navigate("/login");
      }
    }
  };

  const GetUserPreference = async (name) => {
    setPageName(name);
    setShowPage(true);
    if (name === "notifications") {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/notification/preference/",
          {
            method: "GET", // GET request
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data[1].channel.name == "SMS") {
            console.log("Channel is SMS");
            console.log("SMS before: ", sms);
            setSms(data[1].enabled);
            console.log(data[1].enabled);
            console.log("SMS after: ", sms);
          }

          //console.log("Notifications Preferences:", data); // Handle the response data
        } else {
          console.error("Failed to fetch notifications");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }
  };
  const HandlePage = async (name) => {
    setPageName(name);
    setShowPage(true);
    if (page === "notifications") {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/notification/preference/",
          {
            method: "GET", // GET request
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Notifications data:", data); // Handle the response data
        } else {
          console.error("Failed to fetch notifications");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }
  };
  return (
    <div className="settings">
      <div className="title">
        <div className="back" onClick={() => setSettings()}>
          {"<"}
        </div>
        <h2>Settings</h2>
      </div>

      <div className="darkMode">
        <h3>Dark Mode</h3>
        <p onClick={() => setDark(!dark)}>
          <span
            style={
              dark
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

      <ul>
        <li onClick={() => HandlePage("Language")}>
          <img src={language} alt="" />
          <p>Language</p>
          <button>{lang}</button>
        </li>
        <li onClick={() => GetUserPreference("notifications")}>
          <img src={notification} alt="" />
          <p>Notifications</p>
        </li>
        <li onClick={() => HandlePage("security")}>
          <img src={lock} alt="" />
          <p>Security</p>
        </li>
        <li onClick={() => HandlePage("help")}>
          <img src={help} alt="" />
          <p>Help And Feedback</p>
        </li>
        <li onClick={() => HandlePage("share")}>
          <img src={share} alt="" />
          <p>Share App</p>
        </li>
        <li>
          <img src={logout} alt="" />
          <p onClick={() => handleLogout()}>Log Out</p>
        </li>
      </ul>

      {showPage && (
        <div className="showPage">
          {pageName === "Language" ? (
            <Language
              setLang={setLang}
              setShowPage={() => setShowPage(false)}
              setActive={setActive}
              active={active}
            />
          ) : pageName === "help" ? (
            <Feedback setShowPage={() => setShowPage(false)} />
          ) : pageName === "notifications" ? (
            <Notifications setShowPage={() => setShowPage(false)} />
          ) : pageName === "security" ? (
            <Security setShowPage={() => setShowPage(false)} />
          ) : (
            pageName === "share" && (
              <Share setShowPage={() => setShowPage(false)} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Settings;
