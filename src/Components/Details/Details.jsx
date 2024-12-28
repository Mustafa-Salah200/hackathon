/* eslint-disable react/prop-types */
import "./Details.css";
import fire from "../../assets/fire_icon.svg";
import hand from "../../assets/hand_icon.svg";
import clock from "../../assets/clock_icon.svg";
import map from "../../assets/map_icon.svg";
import eyes from "../../assets/eyes_icon.svg";
import google_map from "../../assets/google_map.png";
import man from "../../assets/man.jpg";
import depth1 from "../../assets/depth1.svg";
import depth2 from "../../assets/depth2.svg";
import depth3 from "../../assets/depth3.svg";

const Details = ({ data, setDetails }) => {
  console.log(data);

  return (
    <div className="details">
      <div className="top">
        <svg
          onClick={() => setDetails(null)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path d="M380.6 81.7c7.9 15.8 1.5 35-14.3 42.9L103.6 256 366.3 387.4c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3l-320-160C6.8 279.2 0 268.1 0 256s6.8-23.2 17.7-28.6l320-160c15.8-7.9 35-1.5 42.9 14.3z" />
        </svg>
        <h1>Emergencies Details</h1>
      </div>

      <div className="title">
        <div className="icon">
          <img src={fire} alt="" />
        </div>
        <h2>{data.title}</h2>
      </div>

      <div className="createdBy">Posted by {data.created} , 40 minutes ago</div>

      <div className="category">
        <div className="left">
          Category: <span>{data.category}</span>
        </div>
        <div className="right">
          Level: <span>{data.level}</span>
        </div>
      </div>

      <div className="description">{data.description}</div>

      <div className="location">
        <div className="left">
          <img src={map} alt="" />
          Rwanda, Kigail, Gesoze, 678KG
        </div>
        <div className="right">
          <img src={clock} alt="" />
          1:45pm
        </div>
      </div>

      <div className="google_map">
        <img src={google_map} alt="" />
      </div>

      <button className="seePhoto">
        <img src={eyes} alt="" />
        See Photos
      </button>

      <p className="res-num">
        <img src={hand} alt="" />3 Responders
      </p>
      <div className="btn">
        <button className="respond">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.66671 13.8334L2.00004 9.00009L1.34722 5.73603C1.33801 5.68996 1.33337 5.64309 1.33337 5.59613V5.54249C1.33337 5.08576 1.9275 4.90876 2.17746 5.29106C2.19591 5.31926 2.21226 5.34879 2.22639 5.37939L3.53694 8.21896C3.61011 8.37746 3.79317 8.45266 3.95664 8.39136L4.00004 8.37509L3.37641 3.81484C3.34884 3.61318 3.40187 3.40878 3.52397 3.24595C3.69484 3.01812 4.01807 2.97195 4.24591 3.14282L4.29027 3.1761C4.42697 3.27864 4.52991 3.41972 4.58581 3.58121L5.95637 7.54066C5.98251 7.61613 6.05361 7.66676 6.13347 7.66676C6.24174 7.66676 6.32747 7.57533 6.32051 7.46729L6.02621 2.90586C6.00957 2.64793 6.10481 2.39534 6.28754 2.21258C6.50341 1.99673 6.84704 1.9777 7.08541 2.16839L7.19891 2.25918C7.39271 2.41422 7.52194 2.6358 7.56144 2.88082L8.30767 7.50749C8.32247 7.59929 8.40174 7.66676 8.49471 7.66676C8.59227 7.66676 8.67387 7.59266 8.68327 7.49556L9.12601 2.92068C9.15204 2.6518 9.28571 2.40488 9.49667 2.23613L9.56547 2.18107C9.81287 1.98316 10.1695 2.00291 10.3935 2.22693C10.5684 2.40183 10.6667 2.63905 10.6667 2.8864V9.38953C10.6667 9.65326 10.9584 9.81253 11.1803 9.66993L12.6706 8.71186C12.8857 8.57359 13.136 8.50009 13.3916 8.50009H14.0811C14.3395 8.50009 14.4997 8.78139 14.3677 9.00359L11.5 13.8334C11.5 13.8334 10.3334 15.1668 7.66671 15.1668C5.00004 15.1668 3.88894 14.2779 3.66671 13.8334Z"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Respond
        </button>
        <button className="dismiss">Dismiss</button>
      </div>

      <div className="timeLine">
        <h2>Timeline:</h2>
        <div className="content">
          <TimeLine image={depth1} title="Posted" des="Adam, 40 mins ago" />
          <TimeLine
            image={depth2}
            title="Firefighters en route"
            des="Adam, 10 mins ago"
          />
          <TimeLine
            image={depth3}
            title="Firefighters at scene"
            des="Adam, 7 mins ago"
          />
          <TimeLine
            image={depth3}
            title="Fire under control"
            des="Adam, 0 mins ago"
          />
        </div>
      </div>

      <div className="responders">
        <h2>Responders:</h2>
        <div className="content">
          <Responder name="Winny" text="En route to the scene" />
          <Responder name="Musa" text="At the scene" />
          <Responder name="Alice" text="At the scene" />
        </div>
      </div>
    </div>
  );
};

export default Details;

const TimeLine = ({ title, des, image }) => {
  return (
    <div className="timeline_box">
      <div className="image">
        <img src={image} alt="" />
      </div>
      <div className="info">
        <h3>{title}</h3>
        <p>{des}</p>
      </div>
    </div>
  );
};
const Responder = ({ name, text }) => {
  return (
    <div className="responder">
      <div className="image">
        <img src={man} alt="" />
      </div>

      <div className="info">
        <h3>{name}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};
