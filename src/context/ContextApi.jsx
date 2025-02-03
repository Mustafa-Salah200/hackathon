/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const ContextProvider = createContext();

const ContextApi = ({ children }) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);

  const [userDta, setUserData] = useState(null);

  const UpdateUser = (newUser) => {
    setUser(newUser);
  };

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      try {
        const user = JSON.parse(storedUserData);
        UpdateUser(storedUserData);
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
      }
    } else {
      console.warn("No user data found in localStorage");
    }
  }, []);

  const AddPost = (newPost) => {
    setData((date) => [newPost, ...date]);
  };

  const UpdatePost = (newPost) => {
    const newData = data.map((ele) => {
      if (ele._id === newPost._id) {
        return newPost;
      }
      return ele;
    });
    setData(newData);
  };
  useEffect(() => {
    const FetchData = async () => {
      // Abdo: made some changes here
      const token = Cookies.get("token");
      const response = await fetch("http://localhost:8000/api/incident/", {
        method: "GET",
        Autherization: `Bearer ${token}`,
      });
      const json = await response.json();
      console.log("Json", json);
      if (response.ok) {
        setData(json);
      } else {
        throw new Error("Failed to fetch notes");
      }
    };
    FetchData();
  }, []);
  return (
    <ContextProvider.Provider
      value={{ UpdateUser, user, data, AddPost, UpdatePost }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default ContextApi;
