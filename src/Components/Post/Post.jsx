import "./Post.css";
import location from "../../assets/location_icon.svg";
import file_icon from "../../assets/file_icon.svg";
import { useContext, useEffect, useState } from "react";
import { ContextProvider } from "./../../context/ContextApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}

const Post = () => {
  const { AddPost, user } = useContext(ContextProvider);
  const {
    isLoading,
    position: { lat, lng },
    l_error,
    getPosition,
  } = useGeolocation();
  const [formData, setFormData] = useState({
    title: "",
    category: "Fire",
    level: "Normal",
    description: "",
    location: [lat, lng],
    status: "rtrt",
    // responders: [],
    image: "",
  });

  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const PostEmergency = async () => {
    // Create a new FormData instance
    const formDataToSumbit = new FormData();

    // Append the form fields to FormData
    formDataToSumbit.append("title", formData.title); // Form title
    formDataToSumbit.append("category", formData.category); // Category
    formDataToSumbit.append("description", formData.description); // Description
    formDataToSumbit.append("status", formData.status); // Status
    formDataToSumbit.append("level", formData.level); // Status
    // Append the location as a string (latitude, longitude)
    formDataToSumbit.append("location", JSON.stringify([lat, lng])); // Convert location to string
    //formDataToSumbit.append("profile_picture", file); // Attach the file

    // Append the image file (if provided)
    // if (file) {
    //   formDataToSumbit.append("image", file); // Attach image file
    // }

    console.log("Data To be submitted: ", formDataToSumbit);
    console.log(formData);

    try {
      // Send the request with FormData
      const response = await fetch("http://localhost:8000/api/incident/", {
        method: "POST",
        body: formDataToSumbit, // Send FormData as the request body
      });

      const json = await response.json();

      if (response.ok) {
        console.log("Report submitted successfully: ", json);
        //AddPost(json.data); // Add post to context or handle as needed
        navigate("/"); // Navigate to another page after successful submission
      } else {
        throw new Error("Failed to submit the report");
      }
    } catch (error) {
      console.error("Error submitting report: ", error);
      setError("An error occurred while submitting the report.");
    }
  };

  // console.log("test");

  const HandleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };
  // !file
  const HandleSubmit = () => {
    if (
      formData.title === "" ||
      formData.category === "" ||
      // formData.level === "" ||
      (formData.status == formData.description) === "" ||
      formData.location === ""
    ) {
      setError(
        "fill all the fields with a message and close the form when you click"
      );
    } else {
      setError(false);
      // setFormData({ ...formData, image: file.name });
      setFormData({ ...formData });
      PostEmergency();
    }
  };

  function handleClick() {
    setFormData({ ...formData, location: [lat, lng] });
    console.log(lat, lng);
    getPosition();
  }
  useEffect(() => {
    getPosition();
  }, [getPosition]);
  // ===============================================================
  // const Post = () => {
  //   const { AddPost, user } = useContext(ContextProvider);
  //   const {
  //     isLoading,
  //     position: { lat, lng },
  //     l_error,
  //     getPosition,
  //   } = useGeolocation();

  //   const [formData, setFormData] = useState({
  //     title: "",
  //     category: "Fire",
  //     description: "",
  //     location: [lat, lng],
  //     status: "",
  //   });

  //   const [error, setError] = useState(false);
  //   const navigate = useNavigate();
  //   const [file, setFile] = useState(null);

  //   const PostEmergency = async () => {
  //     // Create a new FormData instance
  //     const formDataToSubmit = new FormData();

  //     // Append the form fields to FormData (using the state formData)
  //     formDataToSubmit.append("title", formData.title);
  //     formDataToSubmit.append("category", formData.category);
  //     formDataToSubmit.append("description", formData.description);
  //     formDataToSubmit.append("status", formData.status);

  //     // Append the location as a string (latitude, longitude)
  //     formDataToSubmit.append("location", JSON.stringify([lat, lng]));

  //     // Append the image file (if provided)
  //     if (file) {
  //       formDataToSubmit.append("image", file);
  //     }

  //     try {
  //       const response = await fetch("http://localhost:8000/api/incident/", {
  //         method: "POST",
  //         body: formDataToSubmit,
  //       });

  //       const json = await response.json();

  //       if (response.ok) {
  //         console.log("Report submitted successfully: ", json);
  //         AddPost(json.data); // Add post to context or handle as needed
  //         navigate("/"); // Navigate to another page after successful submission
  //       } else {
  //         throw new Error("Failed to submit the report");
  //       }
  //     } catch (error) {
  //       console.error("Error submitting report: ", error);
  //       setError("An error occurred while submitting the report.");
  //     }
  //   };

  //   const HandleInput = (e) => {
  //     const name = e.target.name;
  //     const value = e.target.value;
  //     setFormData({ ...formData, [name]: value });
  //   };

  //   const HandleSubmit = () => {
  //     if (
  //       formData.title === "" ||
  //       formData.category === "" ||
  //       formData.status === "" ||
  //       formData.description === "" ||
  //       formData.location === "" ||
  //       !file
  //     ) {
  //       setError(
  //         "Fill all the fields with a message and close the form when you click"
  //       );
  //     } else {
  //       setError(false);
  //       setFormData({ ...formData, image: file.name });
  //       PostEmergency(); // Call the function to submit the data
  //     }
  //   };
  //   function handleClick() {
  //     console.log(lng, lat);
  //     getPosition();
  //   }

  //   useEffect(() => {
  //     getPosition();
  //   }, [getPosition]);
  return (
    <section className="post">
      <h1 className="title">Post Emergency</h1>
      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
          HandleSubmit();
        }}
      >
        <div className="input">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter Title ..."
            value={formData.title}
            onChange={(e) => HandleInput(e)}
          />
        </div>

        <div className="input">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id=""
            value={formData.category}
            onChange={(e) => HandleInput(e)}
          >
            <option value="fire">Fire</option>
            <option value="electric">Electric</option>
          </select>
        </div>

        <div className="input">
          <label htmlFor="level">Status</label>
          <select
            name="status"
            id=""
            value="active" //{formData.status}
            onChange={(e) => HandleInput(e)}
          >
            <option value="normal">Normal</option>
            <option value="medium">Medium</option>
            <option value="danger">Danger</option>
          </select>
        </div>

        <div className="input">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            placeholder="Enter Description ..."
            value={formData.description}
            onChange={(e) => HandleInput(e)}
          />
        </div>

        <div className="btn">
          <div className="file-upload">
            <img src={file_icon} alt="" />
            <input
              type="file"
              // name="image"
              id="upload"
              // value={formData.image}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="upload">Upload Photo</label>
          </div>
          <button onClick={handleClick}>
            <img src={location} alt="" />
            Add Location
          </button>
        </div>
        {/* 
        {isLoading && <p>Loading position...</p>}
        {l_error && <p>{l_error}</p>}
        {!isLoading && !error && lat && lng && (
          <p>
            Your GPS position:{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
            >
              {lat}, {lng}
            </a>
          </p>
        )} */}

        <div className="check">
          <input type="checkbox" name="" id="check1" />
          <label htmlFor="check1">Include my Contact information</label>
        </div>
        <div className="check">
          <input type="checkbox" name="" id="check2" />
          <label htmlFor="check2">I accept the terms and conditions</label>
        </div>
        {error && <p className="error">{error}</p>}
        <button className="submit" type="submit">
          Submit Emergency
        </button>
      </form>
    </section>
  );
};

export default Post;
