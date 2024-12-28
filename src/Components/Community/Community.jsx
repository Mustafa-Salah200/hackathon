/* eslint-disable react/prop-types */
import "./Community.css";
import one from "../../assets/one.svg";
import two from "../../assets/two.svg";
import three from "../../assets/three.svg";
import man from "../../assets/man.jpg";

const Community = () => {
  return (
    <section className="community">
      <h1 className="title">Community</h1>
      <h2>Leaderboard</h2>
      <div className="leaderBoard">
        <Box
          point={1200}
          name="Emmanuel John"
          image={one}
          top={true}
          profile_img={man}
          ranking={1}
        />
        <Box
          point={900}
          name="Mohammed Hassan"
          image={two}
          top={true}
          profile_img={man}
          ranking={2}
        />
        <Box
          point={400}
          name="John Peter"
          image={three}
          top={true}
          profile_img={man}
          ranking={3}
        />
      </div>
      <h2>Your Ranking</h2>
      <Box point={200} name="Peter Lee" top={false} profile_img={man} ranking={47}/>
    </section>
  );
};

export default Community;

const Box = ({ point, name, image, top, profile_img , ranking}) => {
  return (
    <div className="box">
      <div className="left">
        <div className="image">
          <img src={profile_img} alt="" />
        </div>
        <div className="info">
          <h3>{name}</h3>
          <div className="point">
            {top && <img src={image} alt="" />}
            <p>{point} Points</p>
          </div>
        </div>
      </div>
      <div className="right">
        <h1>{ranking}</h1>
      </div>
    </div>
  );
};
