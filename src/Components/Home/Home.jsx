import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
// import { useContext } from "react";
// import { ContextProvider } from "../../context/ContextApi";
import Main from "../Main/Main";
import Cookies from "js-cookie";

const Home = () => {
  // const { user } = useContext(ContextProvider);

  // Addo make some changes here by accessing the token from the cookies
  // and using it to protect protected route

  const userToken = Cookies.get("token");

  return userToken ? (
    <div className="container">
      <Navbar />
      <Outlet />
    </div>
  ) : (
    <Main />
  );
};

export default Home;
