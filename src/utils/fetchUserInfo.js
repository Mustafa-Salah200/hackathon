import axios from "axios";

// sending a request to access the login user information
export const getUserInfo = async (user_id) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/account/user/${user_id}/`
    );
    const data = await response.data;
    // console.log("User Data:", data);

    if (response.status === 200 || response.status === 201) {
      console.log("recieve User data successfully");
      localStorage.setItem("userData", JSON.stringify(data));
    } else {
      console.log("Error");
    }

    return data;
  } catch (error) {
    console.log("Error fetching Data user data", error);
  }
};
