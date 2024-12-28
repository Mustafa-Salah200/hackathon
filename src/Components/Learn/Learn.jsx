/* eslint-disable react/prop-types */
import heart from "../../assets/heart_rate.svg";
import swimming from "../../assets/swimming.svg";
import hospital from "../../assets/hospital.svg";
import house from "../../assets/house_fire.svg";
import award from "../../assets/award_icon.svg";
import "./Learn.css";
import { useEffect, useState } from "react";

const Learn = () => {
  return (
    <section className="learn">
      <h1 className="title">Learn</h1>
      <div className="guides">
        <h2>Quick Access Guides</h2>
        <div className="content">
          <GuideBox image={heart} title="CPR Basics" min={10} />
          <GuideBox image={house} title="Fire Basics" min={10} />
          <GuideBox image={hospital} title="Emergency Kits" min={10} />
          <GuideBox image={swimming} title="Water Rescue" min={10} />
        </div>
      </div>

      <div className="feature">
        <h2>Featured Courses</h2>
        <div className="content">
          <FeatureBox title="Emergency Preparedness" rate="0" text="Start" />
          <FeatureBox title="First Aid  Basics" rate="70" text="Continue" />
        </div>
      </div>
      <div className="Certificates">
        <h2>Certificates</h2>
        <div className="content">
          <CertificateBox title="Basic Life Support" info="Completed on December, 15, 2024" />
          <CertificateBox title="Panic Control" info="Completed on October, 17, 2024" />
        </div>
      </div>
    </section>
  );
};

export default Learn;

const GuideBox = ({ image, title, min }) => {
  return (
    <div className="guideBox">
      <div className="top">
        <img src={image} alt="" />
        <div className="info">
          <h4>{title}</h4>
          <p>{min} Min</p>
        </div>
      </div>
      <button>View Guide</button>
    </div>
  );
};

const FeatureBox = ({ title, rate, text }) => {
  const [color, setColor] = useState(null);
  rate = rate * 1;
  console.log(rate);
  useEffect(() => {
    if (rate <= 100 && rate >= 70) {
      setColor("#0BDB11");
    } else if (rate < 70 && rate >= 20) {
      setColor("#FFC107");
    } else if (rate < 20 && rate >= 0) {
      setColor("#E51B1B");
    }
  }, []);
  return (
    <div className="featureBox">
      <div className="top">
        <h4>{title}</h4>
        <span
          style={{
            color: color,
          }}
        >
          {rate} %
        </span>
      </div>
      <div className="rate">
        <span
          style={{
            width: `${rate}%`,
          }}
        ></span>
      </div>
      <button>{text}</button>
    </div>
  );
};

const CertificateBox = ({title,info})=>{
  return (
    <div className="certificateBox">
      <div className="image">

      <img src={award} alt="" />
      </div>
      <div className="info">
        <h3>{title}</h3>
        <p>{info}</p>
      </div>
    </div>
  )
}