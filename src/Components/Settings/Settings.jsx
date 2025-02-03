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
import { ContextProvider } from "../../context/ContextApi";

const Settings = ({ setSettings }) => {
  const [dark, setDark] = useState(false);
  const [showPage, setShowPage] = useState(false);
  const [lang, setLang] = useState("English");
  const [active, setActive] = useState(2);

  const [pageName, setPageName] = useState("");
  const {UpdateUser} = useContext(ContextProvider)

  const HandlePage = (name) => {
    setPageName(name);
    setShowPage(true);
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
        <li onClick={() => HandlePage("notifications")}>
          <img src={notification} alt="" />
          <p>Notifications</p>
        </li>
        <li onClick={() => HandlePage("security")}>
          <img src={lock} alt="" />
          <p>Security</p>
        </li>
        <li onClick={() => HandlePage("help")}>
          <img src={help} alt="" />
          <p>help And Feedback</p>
        </li>
        <li onClick={() => HandlePage("share")}>
          <img src={share} alt="" />
          <p>Share App</p>
        </li>
        <li>
          <img src={logout} alt="" />
          <p onClick={()=> UpdateUser(null)}>Log Out</p>
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
          ) : (
            pageName === "help" ? <Feedback setShowPage={() => setShowPage(false)}/> :
            pageName === "notifications" ? <Notifications setShowPage={() => setShowPage(false)}/> :
            pageName === "security" ? <Security setShowPage={() => setShowPage(false)}/> :
            pageName === "share" && <Share setShowPage={() => setShowPage(false)}/>
          )}
        </div>
      )}
    </div>
  );
};

export default Settings;
