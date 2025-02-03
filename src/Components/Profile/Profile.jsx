/* eslint-disable react/prop-types */
import account from "../../assets/account_icon.svg";
import settings from "../../assets/settings.svg";
import "./Profile.css";
import Emergence from "../Emergence/Emergence";
import { useContext, useEffect, useState } from "react";
import Settings from "../Settings/Settings";
import Edit from "../Edit/Edit";
import { ContextProvider } from "../../context/ContextApi";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [settings, setSettings] = useState(false);


  const [users, setUsers] = useState();
  const { user } = useContext(ContextProvider);
  const YourRanking = users && users.findIndex((ele) => ele.name === user.name);

  useEffect(() => {
    const FetchUsersData = async () => {
      const response = await fetch("http://127.0.0.1:4000/api/v1/users/top");
      const json = await response.json();
      if (response.ok) {
        setUsers(json.data);
      }
    };
    FetchUsersData();
  }, [user]);
  return (
    <>
      {edit ? (
        <Edit setEdit={() => setEdit(false)} />
      ) : settings ? (
        <SettingPage setSettings={setSettings} />
      ) : (
        <Profile2
          setEdit={setEdit}
          setSettings={setSettings}
          YourRanking={YourRanking + 1}
        />
      )}
    </>
  );
};

export default Profile;

const Profile2 = ({ setSettings, setEdit, YourRanking }) => {
  const [post, setPost] = useState();
  const [userInfo, setUserInfo] = useState(null);
  const [response, setResponse] = useState();
  const { user, data } = useContext(ContextProvider);

  useEffect(() => {
    const Posts = data?.filter((ele) => {
      return ele.user?.id === userInfo?._id;
    });
    setPost(Posts);

    const Response = [];
    data?.filter((ele) => {
      ele.responders?.filter((e) => {
        if (e?.userId === user?._id) {
          Response.push(ele);
        }
      });
    });
    setResponse(Response);
  }, [data, user]);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    userData && setUserInfo(userData);
  }, []);
  return (
    <section className="profile">
      <h1 className="title">Profile</h1>
      <div className="top">
        <div className="image">
          <img src={userInfo && userInfo.profile_picture} alt="" />
        </div>
        <h1>{userInfo?.username}</h1>
        <p>Emergency Responder</p>
      </div>

      <div className="btn">
        <button className="pro" onClick={() => setEdit(true)}>
          <img src={account} alt="" />
          Edit Profile
        </button>
        <button className="setting" onClick={() => setSettings(true)}>
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
            <h1>{post && post?.length}</h1>
          </div>
          <div className="">
            <h3>Total Points</h3>
            <h1>{user?.point}</h1>
          </div>
          <div className="ranking">
            <h3>Ranking</h3>
            <h1
              style={
                YourRanking <= 3
                  ? {
                      color: "#0BDB11",
                      backgroundColor: "#D4FFD5",
                    }
                  : {
                      color: "#000",
                      backgroundColor: "#eee",
                    }
              }
            >
              {YourRanking}
            </h1>
          </div>
        </div>
      </div>

      <div className="history">
        {post && post?.length > 0 && (
          <>
            <h1>Post History</h1>
            <div className="content">
              {post.map((item, index) => {
                return <Emergence key={index} data={item} status="null" />;
              })}
            </div>
          </>
        )}
        {response && response?.length > 0 && (
          <>
            <h1>Response History</h1>
            <div className="content">
              {response?.map((item, index) => {
                return <Emergence key={index} data={item} status="null" />;
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const SettingPage = ({ setSettings }) => {
  return <Settings setSettings={() => setSettings(false)} />;
};
