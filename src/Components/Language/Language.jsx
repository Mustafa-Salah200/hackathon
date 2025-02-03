/* eslint-disable react/prop-types */
import "./Language.css";
import united from "./images/United.png";
import france from "./images/France.png";
import rwanda from "./images/Rwanda.png";
import saudi from "./images/Saudi.png";
import circle1 from "./images/circle2.svg";
import circle2 from "./images/circle1.svg";
import close from "./images/close.svg";
import { useState } from "react";

const Language = ({setLang,setShowPage,setActive,active}) => {
  const [language,setLanguage] = useState('English');
  const handleLanguageClick = (index,language) => {
    setLanguage(language);
    setActive(index)
    setLang(language);
    setShowPage()
    
  }
  return (
    <div className="language">
      <div className="close" onClick={()=> setShowPage()}>
        <img src={close} alt="" />
      </div>
      <h1>Language</h1>
      <div className="lang">
        <li>
          <div className="left">
            <h2>Kinyarwanda</h2>
            <img src={rwanda} alt="" />
          </div>

          <div className="right" onClick={()=> handleLanguageClick(1,'Kinyarwanda')}>
            <img src={active === 1? circle2 : circle1} alt="" />
          </div>
        </li>

        <li>
          <div className="left">
            <h2>English</h2>
            <img src={united} alt="" />
          </div>
          <div className="right" onClick={()=> handleLanguageClick(2,'English')}>
            <img src={active === 2? circle2 : circle1} alt="" />
          </div>
        </li>

        <li>
          <div className="left">
            <h2>French</h2>
            <img src={france} alt="" />
          </div>
          <div className="right" onClick={()=> handleLanguageClick(3,'French')}>
            <img src={active === 3? circle2 : circle1} alt="" />
          </div>
        </li>

        <li>
          <div className="left">
            <h2>Arabic</h2>
            <img src={saudi} alt="" />
          </div>
          <div className="right" onClick={()=> handleLanguageClick(4,'Arabic')}>
            <img src={active === 4? circle2 : circle1} alt="" />
          </div>
        </li>
      </div>
    </div>
  );
};

export default Language;
