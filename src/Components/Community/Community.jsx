/* eslint-disable react/prop-types */
import "./Community.css";
import one from "../../assets/one.svg";
import two from "../../assets/two.svg";
import three from "../../assets/three.svg";
import { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../../context/ContextApi";

const Community = () => {
  const [users, setUsers] = useState();
  const { user } = useContext(ContextProvider);
  const YourRanking = users && users.findIndex((ele) => ele.name === user.name);

  useEffect(() => {
    const FetchUsersData = async () => {
      console.log(localStorage.getItem("userData"));
      const response = await fetch("http://127.0.0.1:4000/api/v1/users/top");
      const json = await response.json();
      if (response.ok) {
        setUsers(json.data);
      }
    };
    FetchUsersData();
  }, [user]);
  return (
    <section className="community">
      <h1 className="title">Community</h1>
      <h2>Leaderboard </h2>
      <div className="leaderBoard">
        {users &&
          users.slice(0, 3).map((ele, index) => {
            return <Box key={ele.name} data={ele} index={index + 1} />;
          })}
      </div>
      <h2>Your Ranking</h2>
      {users && (
        <Box
          point={user.point}
          data={users[YourRanking]}
          index={YourRanking + 1}
        />
      )}
    </section>
  );
};

export default Community;

const Box = ({ data, index }) => {
  return (
    <div className="box">
      <div className="left">
        <div className="image">
          <img src={data.image} alt="" />
        </div>
        <div className="info">
          <h3>{data.name}</h3>
          <div className="point">
            {top && (
              <img src={index === 1 ? one : index === 2 ? two : three} alt="" />
            )}
            <p>{data.point} Points</p>
          </div>
        </div>
      </div>
      <div className="right">
        <h1>{index}</h1>
      </div>
    </div>
  );
};
