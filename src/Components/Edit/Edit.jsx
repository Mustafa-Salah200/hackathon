/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import "./Edit.css";
import { ContextProvider } from "../../context/ContextApi";
import file_icon from "../../assets/file_icon.svg";
import axios from "axios";

const Edit = ({ setEdit }) => {
  const { user, UpdateUser } = useContext(ContextProvider);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const HandleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };
  const HandleUpload = async (e) => {
    const formdata = new FormData();
    formdata.append("file", e);
    axios
      .post(`http://localhost:4000/api/v1/upload/${user._id}`, formdata)
      .then(() => UpdateTheUser(e))
      .catch((err) => console.log(err));
  };
  const UpdateTheUser = async (e) => {
    const response = await fetch(
      `http://localhost:4000/api/v1/users/${user._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: e.name }),
      }
    );
    const json = await response.json();
    if (response.ok) {
      UpdateUser(json.data);
    } else {
      setError("error");
    }
  };
  const UpdateUserInfo = async () => {
    const response = await fetch(
      `http://localhost:4000/api/v1/users/${user._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const json = await response.json();
    if (response.ok) {
      UpdateUser(json.data);
      setError(null)
      setEdit()
    } else {
      const keys = Object.keys(json.message.keyPattern);
      setError(`the field ${keys[0]} is used try to use another ${keys[0]}`);
    }
  };
  const HandleSubmit = () => {
    if (
      formData.name !== "" ||
      formData.email !== "" ||
      formData.password !== ""
    ) {
      UpdateUserInfo();
    }
  };
  return (
    <div className="edit">
      <div className="title">
        <div className="back" onClick={() => setEdit()}>
          {"<"}
        </div>
        <h2>Edit</h2>
      </div>

      <div className="image">
        <img
          src={`http://localhost:4000/images/${user._id}/${user.image}`}
          alt=""
        />
        <div className="file-upload">
          <input
            type="file"
            id="upload"
            onChange={(e) => {
              HandleUpload(e.target.files[0]);
            }}
          />
          <label htmlFor="upload">
            <img src={file_icon} alt="" />
          </label>
        </div>
      </div>
      <div className="form">
        <div className="input">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            defaultValue={formData.name}
            onChange={(e) => HandleInput(e)}
          />
        </div>
        <div className="input">
          <label htmlFor="name">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            defaultValue={formData.email}
            onChange={(e) => HandleInput(e)}
          />
        </div>
        <div className="input">
          <label htmlFor="name">Phone</label>
          <input
            id="phone"
            type="text"
            name="phone"
            defaultValue={formData.phone}
            onChange={(e) => HandleInput(e)}
          />
        </div>

        {error && <p className="error">{error}</p>}
        <button onClick={() => HandleSubmit()}>Update</button>
      </div>
    </div>
  );
};

export default Edit;
