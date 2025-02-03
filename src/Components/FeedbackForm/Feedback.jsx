/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Feedback.css"; 

const Feedback = ({setShowPage}) => {
  const [rating, setRating] = useState(null);
  const [message, setMessage] = useState("");

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Rating:", rating);
    console.log("Message:", message);
    setShowPage()
  };

  return (
    <div className="feedback">
      <div className="header">
        <p className="back" onClick={()=> setShowPage()}>
        <svg width="800px" height="800px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/></svg>
        </p>
        <h2>Help And Feedback</h2>
      </div>

      <div>
        <h3>How Would You Rate Your Experience?</h3>

        <div className="icons">
          <button
            onClick={() => handleRatingChange(1)}
            className={rating === 1 ? "active" : ""}
          >
            🥲
          </button>
          <button
            onClick={() => handleRatingChange(2)}
            className={rating === 2 ? "active" : ""}
          >
            😐
          </button>
          <button
            onClick={() => handleRatingChange(3)}
            className={rating === 3 ? "active" : ""}
          >
            😌
          </button>
          <button
            onClick={() => handleRatingChange(4)}
            className={rating === 4 ? "active" : ""}
          >
            😊
          </button>
          <button
            onClick={() => handleRatingChange(5)}
            className={rating === 5 ? "active" : ""}
          >
            😍
          </button>
        </div>
      </div>

      <div className="message-section">
        <h3>Would You Like To Leave Us A Message?</h3>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Type Your Message..."
        />
      </div>

      <button className="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Feedback;
