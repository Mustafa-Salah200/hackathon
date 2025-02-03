import { useNavigate } from "react-router-dom";
import "./Main.css";
import phone_mockup from "./images/phone_mockup.png";
import who from "./images/who.png";
import flag from "./images/flag.png";
import coat from "./images/coat.png";
import Mask_group from "./images/Mask_group.png";
import five from "./images/five.svg";
import alarm from "./images/alarm.svg";
import light from "./images/light.svg";
import user from "./images/user.svg";
import screen from "./images/screen.png";
import vector from "./images/vector.png";
import Cookies from "js-cookie";

const Main = () => {
  const navigate = useNavigate();
  const userToken = Cookies.get("token");
  return (
    <div className="main">
      <div className="nav">
        <h1 className="main_logo">
          <span></span>
          1stResponse
        </h1>
        {/* =================================================================================== */}
        {/* <div className="btn">
          <button className="signup" onClick={() => navigate("/signUp")}>
            sign Up
          </button>
          <button className="login" onClick={() => navigate("/login")}>
            Login
          </button>
        </div> */}
        <div className="btn">
          {userToken ? (
            <button onClick={() => console.log("Logout logic here")}>
              Logout
            </button>
          ) : (
            <>
              <button className="signup" onClick={() => navigate("/signUp")}>
                Sign Up
              </button>
              <button className="login" onClick={() => navigate("/login")}>
                Login
              </button>
            </>
          )}
        </div>
        {/* ==================================================================================== */}
      </div>
      <div className="main_landing">
        <div className="left">
          <h1>Every Second Counts in an Emergency</h1>
          <p>
            Transforming our communities into a network of emergency responders
          </p>
          <div className="btn">
            <button className="signup" onClick={() => navigate("/signUp")}>
              Sign Up
            </button>
            <button className="login" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
          <div className="info">
            <span>4.8/5.0</span>

            <span>based on 2000 reviews</span>
          </div>
        </div>

        <div className="right">
          <img src={phone_mockup} alt="" />
        </div>
      </div>

      <div className="icons">
        <p>Trusted by the Governemnt of Rwanda</p>
        <img src={coat} alt="" />
        <img src={who} alt="" />
        <img src={flag} alt="" />
      </div>

      <div className="about">
        <img src={Mask_group} alt="" />
        <div className="info">
          <h1>About us</h1>
          <p>
            Bridging the Critical Gap in Emergency Response 1stResponse is a
            community-powered emergency response platform that connects people
            in crisis with nearby qualified helpers. We're revolutionizing
            emergency response by creating a network of verified community
            members who can provide crucial assistance while professional help
            is on the way.
          </p>
          <div className="btn">
            <button className="work">
              <a href="#feature">How does it work?</a>
            </button>
            <button className="join" onClick={() => navigate("/signUp")}>
              Join us
            </button>
          </div>
        </div>
      </div>

      <div className="impact">
        <div className="top">
          <h1>Our Impact</h1>
          <h2>Making a Real Difference in Communities</h2>
          <h3>Our Impact in Numbers</h3>
        </div>
        <div className="bottom">
          <div className="">
            <img src={five} alt="" />
            <h2>50,000+</h2>
            <p>Active Community Responders</p>
          </div>
          <div className="">
            <img src={light} alt="" />
            <h2>15,000+ </h2>
            <p>Emergencies Attended</p>
          </div>
          <div className="">
            <img src={alarm} alt="" />
            <h2>8 Minute</h2>
            <p>Average Response Time.</p>
          </div>
          <div className="">
            <img src={user} alt="" />
            <h2>250+</h2>
            <p>Communities Protected.</p>
          </div>
        </div>
      </div>

      <div id="feature" className="feature">
        <div className="title">
          <h1>Features</h1>
          <p>How it all works?</p>
        </div>
        <div className="content">
          <div className="left">
            <img src={screen} alt="" />
          </div>
          <div className="right">
            <h4>Empowering Communities, Saving Lives</h4>

            <p>
              {" "}
              <span>1</span> Sign up and Login{" "}
            </p>
            <p>
              {" "}
              <span>2</span> Report and Respond to Emergencies Instantly
            </p>
            <p>
              {" "}
              <span>3</span> Customize preferences for a personalized learning
            </p>
            <p>
              {" "}
              <span>4</span> Upload photos, share location, and alert nearby
              responders with just a few taps.
            </p>
            <p>
              {" "}
              <span>5</span> Monitor emergency response progress and coordinate
              efforts effectively.
            </p>
            <p>
              {" "}
              <span>6</span> Access comprehensive emergency response courses and
              get certified.
            </p>
            <p>
              {" "}
              <span>7</span> Track Progress, Earn points and Celebrate
              Achievements
            </p>
          </div>
        </div>
      </div>

      <div className="community">
        <div className="title">
          <h1>What Our Community Says</h1>
          <p>Below are some of the reviews and feedback from our Community</p>
        </div>

        <div className="content">
          <div className="box">
            <img src={vector} alt="" />
            <q>
              1stResponse helped me save my neighbor's life. The quick response
              time and coordination made all the difference.
            </q>
            <p>Sarah , Community Responder</p>
          </div>
          <div className="box">
            <img src={vector} alt="" />
            <q>
              1stResponse helped me save my neighbor's life. The quick response
              time and coordination made all the difference.
            </q>
            <p>Sarah , Community Responder</p>
          </div>
          <div className="box">
            <img src={vector} alt="" />
            <q>
              1stResponse helped me save my neighbor's life. The quick response
              time and coordination made all the difference.
            </q>
            <p>Sarah , Community Responder</p>
          </div>
        </div>
      </div>

      <div className="team">
        <div className="title">
          <h1>Meet Our Team</h1>
          <p>Meet the Brains behind the innovation</p>
        </div>

        <div className="content">
          <div className="box">
            <div className="image"></div>
            <h2>Lokosang Felix</h2>
            <p>UI/UX</p>
          </div>
          <div className="box">
            <div className="image"></div>
            <h2>Mustafa SalahAldin</h2>
            <p>Frontend Dev</p>
          </div>

          <div className="box">
            <div className="image"></div>
            <h2>IK Miles</h2>
            <p>Frontend Dev</p>
          </div>

          <div className="box">
            <div className="image"></div>
            <h2>Abdulrahaman </h2>
            <p>Backend Dev</p>
          </div>

          <div className="box">
            <div className="image"></div>
            <h2>Abdallah</h2>
            <p>Backend Dev</p>
          </div>

          <div className="box">
            <div className="image"></div>
            <h2>Victor</h2>
            <p>Backend Dev</p>
          </div>
        </div>
      </div>

      <div className="news">
        <div className="left">
          <h1>Newsletter</h1>
          <p>
            Spark joy in learning Join our newsletter to get the latest updates,
            news and community activities
          </p>
        </div>
        <div className="right">
          <input type="text" placeholder="Enter Your Email" />
          <button>🚀 Subscribe</button>
        </div>
      </div>

      <footer>
        <div className="top">
          <div className="left">
            <h1 className="main_logo">
              <span></span> 1stResponse
            </h1>
            <p>Empowering communities to respond faster, together.</p>
          </div>
          <div className="right">
            <button className="signup" onClick={() => navigate("/signUp")}>
              Sign Up
            </button>
            <button className="login" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>
        <div className="bottom">
          &copy; 2025 SafeResponse. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Main;
