/* eslint-disable react/prop-types */
import "./Details.css";
import fire from "../../assets/fire_icon.svg";
import hand from "../../assets/hand_icon.svg";
import clock from "../../assets/clock_icon.svg";
import map from "../../assets/map_icon.svg";
import eyes from "../../assets/eyes_icon.svg";
import depth1 from "../../assets/depth1.svg";
import depth2 from "../../assets/depth2.svg";
import depth3 from "../../assets/depth3.svg";
import arrow_up from "../../assets/arrow_up.svg";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../../context/ContextApi";
import Cookies from "js-cookie";

const Details = ({ data, setDetails }) => {
  console.log(data);

  const [active, setActive] = useState(data && data.type);
  const [showImage, setShowImage] = useState(false);
  const [countRespond, setCountRespond] = useState(data.responders?.length);
  const { user, UpdatePost, UpdateUser } = useContext(ContextProvider);
  const [createComment, setCreateComment] = useState("");
  const [addRespond, setAddRespond] = useState(0);
  const [commentsArray, setCommentsArray] = useState(null);
  const [userInfo, setUserInfo] = useState();

  const HandleActive = async () => {
    active === "active" ? setActive("inactive") : setActive("active");
    const response = await fetch(`http://localhost:8000/api/incident/1/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: active === "active" ? "inactive" : "active",
      }),
    });
    const json = await response.json();
    if (response.ok) {
      UpdatePost(json.data);
    } else {
      throw new Error("Failed to fetch notes");
    }
  };
  const HandlePoint = async () => {
    const response = await fetch(`http://127.0.0.1:8000/account/user/4/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        point: user.point + 5,
      }),
    });
    const json = await response.json();
    if (response.ok) {
      UpdateUser(json.data);
    } else {
      throw new Error("Failed to fetch notes");
    }
  };
  const HandleRespond = async () => {
    if (addRespond < 1) {
      // const found = await data.responders.find(
      //   (ele) => ele.userId === user._id
      // );
      // if (found) {
      //   return;
      // } else {
      setCountRespond(countRespond + 1);
      setAddRespond(1);
      const response = await fetch(
        `http://127.0.0.1:8000/api/incident/${data.id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        UpdatePost(json);
        // HandlePoint();
      } else {
        throw new Error("Failed to fetch notes");
      }
    }
  };
  const HandleCreateComment = async () => {
    if (createComment !== "") {
      const ob = {
        user: userInfo,
        incident_id: data.id,
        content: createComment,
      };
      console.log(Cookies.get("token"));
      setCommentsArray([...commentsArray, ob]);

      const response = await fetch(
        `http://127.0.0.1:8000/api/incident/comment/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            incident_id: data.id,
            content: createComment,
          }),
        }
      );
      const json = await response.json();
      if (response.ok) {
        // const GetAllComments = async () => {
        //   const response = await fetch(
        //     `http://127.0.0.1:8000/api/incident/comments/`
        //   );
        //   const json = await response.json();
        //   console.log("response", json);
        //   if (response.ok) {
        //     setCommentsArray(json);
        //   } else {
        //     // throw new Error("Failed to fetch notes");
        //   }
        // };
        // GetAllComments();
      } else {
        throw new Error("Failed to fetch notes");
      }
    }
  };
  useEffect(() => {
    const GetAllComments = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/incident/comments/`
      );
      const json = await response.json();
      console.log("response", json);

      if (response.ok) {
        setCommentsArray(json);
      } else {
        // throw new Error("Failed to fetch notes");
      }
    };
    GetAllComments();
  }, []);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    userData && setUserInfo(userData);
    console.log(userData.profile_picture);
  }, []);
  useEffect(() => {
    const url = new URL("https://localhost:3333/.well-known/mercure");
    url.searchParams.append("topic", "/chat");

    const eventSource = new EventSource(url);
    eventSource.onmessage = (event) => {
      console.log("Received event:", event.data);
      const newComment = JSON.parse(event.data);
      setCommentsArray([...commentsArray, newComment]);
    };
  });
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

      <div className="createdBy">Posted by {data.user.username}</div>
      {data && userInfo && userInfo.id === data.user.id && (
        <div className="status">
          <h3>Status: </h3>
          <p
            onClick={() => HandleActive()}
            style={
              active !== "active"
                ? {
                    backgroundColor: "#3f3636",
                  }
                : {
                    backgroundColor: "#D9D9D9",
                  }
            }
          >
            <span
              style={active !== "active" ? { left: "35px" } : { left: "5px" }}
            ></span>
          </p>
        </div>
      )}
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
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${data.location[0]}/${data.location[1]}`}
          >
            Go to Location
          </a>
        </div>
        <div className="right">
          <img src={clock} alt="" />
          {data.time}
        </div>
      </div>

      <div className="google_map">
        <MapContainer
          className="map"
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <button className="seePhoto" onClick={() => setShowImage(true)}>
        <img src={eyes} alt="" />
        See Photos
      </button>

      <p className="res-num">
        <img src={hand} alt="" /> {countRespond} Responders
      </p>
      {data &&
        userInfo &&
        userInfo.id !== data.user.id &&
        data.status !== "inactive" && (
          <div className="btn">
            <button className="respond" onClick={() => HandleRespond()}>
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
            <button className="dismiss" onClick={() => setDetails(null)}>
              Dismiss
            </button>
          </div>
        )}
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
          {data.responders?.map((ele, index) => {
            return <Responder key={index} info={ele} />;
          })}
        </div>
      </div>
      <h2>Comments</h2>
      <div className="comments">
        {commentsArray &&
          commentsArray.map((ele, index) => {
            return <Comment key={index} user={ele} />;
          })}
      </div>

      {data && data.status === "active" && (
        <div className="form">
          <img
            className="image_profile"
            src={userInfo && userInfo.profile_picture}
            alt=""
          />
          <input
            type="text"
            placeholder="Add Comment..."
            value={createComment}
            onChange={(e) => setCreateComment(e.target.value)}
          />
          <img
            className="icon"
            src={arrow_up}
            alt=""
            onClick={() => HandleCreateComment()}
          />
        </div>
      )}

      {showImage && (
        <div className="showImage">
          <span className="close" onClick={() => setShowImage(false)}>
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
          </span>
          <div className="image">
            <img
              src={`http://localhost:4000/images/${data._id}/${data.image}`}
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;

const Comment = ({ user }) => {
  console.log(user);

  return (
    <div className="comment">
      <div className="left">
        {<img src={user.user?.profile_picture} alt="" />}
      </div>
      <div className="right">
        <h2>{user.user?.username}</h2>
        <p className="content">{user.content}</p>
        {/* <p className="time">20 mins ago </p> */}
      </div>
    </div>
  );
};
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
const Responder = ({ info }) => {
  return (
    <div className="responder">
      <div className="image">
        <img src={info.image} alt="" />
      </div>

      <div className="info">
        <h3>{info.name}</h3>
        <p>{info.state}</p>
      </div>
    </div>
  );
};
