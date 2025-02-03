/* eslint-disable react/prop-types */
import fire from "../../assets/fire_icon.svg";
import hand from "../../assets/hand_icon.svg";
import clock from "../../assets/clock_icon.svg";
import active from "../../assets/active.svg";
import inactive from "../../assets/in_active.svg";

import "./Emergence.css";
import { useContext } from "react";
import ContextApi from "../../context/ContextApi";
const Emergence = ({ status, setDetails, data }) => {
  return (
    <div className="emergence" onClick={setDetails}>
      <div className="left">
        <div className="icon">
          <img src={fire} alt="" />
        </div>

        <div className="emergence_content">
          <h2 className="top">{data?.title}</h2>
          <div className="info">
            <div className="left">
              <img src={clock} alt="" />
              <span>{data.time}</span>
            </div>
            <div className="right">
              <img src={hand} alt="" />
              <span>{data.responders?.length} responders</span>
            </div>
          </div>
        </div>
      </div>

      <div className="status">
        {status === "active" && <img src={active} alt="" />}
        {status === "inactive" && <img src={inactive} alt="" />}
      </div>
    </div>
  );
};

export default Emergence;
