import man from "../../assets/man.jpg";
import account from "../../assets/account_icon.svg";
import settings from "../../assets/settings.svg";
import "./Profile.css";
import Emergence from "../Emergence/Emergence";


const Profile = () => {
  const data = {
    "id": 3,
    "title": "Woman in Labour, Kaciciru",
    "category": "fire",
    "createAt": "2020-12-29",
    "level": "medium",
    "description": "Large fire reported in a residential building.Multiple units affected.Immediate assistance required.",
    "location": "Gisozi, Ruhango Market",
    "time": "1:45pm",
    "responders": [
      { "name": "Winny", "type": "En route to the scene" },
      { "name": "Mustafa", "type": "At the scene" },
      { "name": "Musa", "type": "At the scene" }
    ],
    "status": "finished",
    "type": "active",
    "creator": "Willam Thomas",
    "images": []
  }
  return (
    <section className="profile">
      <h1 className="title">Profile</h1>
      <div className="top">
        <div className="image">
          <img src={man} alt="" />
        </div>
        <h1>Peter Lee</h1>
        <p>Emergency Responder</p>
      </div>

      <div className="btn">
        <button className="pro">
          <img src={account} alt="" />
          Edit Profile
        </button>
        <button className="setting">
          <img src={settings} alt="" />
          Settings
        </button>
      </div>

      <div className="status">
        <h3>Status</h3>
        <div className="content">
          <div className="">
            <h3>Total Responses</h3>
            <h1>1</h1>
          </div>
          <div className="">
            <h3>Posts</h3>
            <h1>0</h1>
          </div>
          <div className="">
            <h3>Total Points</h3>
            <h1>200</h1>
          </div>
          <div className="ranking">
            <h3>Ranking</h3>
            <h1>47</h1>
          </div>
        </div>
      </div>

      <div className="history">
        <h1>Response History</h1>
        <div className="content">
          <Emergence
            data={data}
            status='null'
          />
        </div>
      </div>
    </section>
  );
};

export default Profile;
