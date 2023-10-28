import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";

const NavBar = () => {
  const { setAccessToken, user, setUser, role } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8080/logout");
      setAccessToken("");
      setUser("");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleManage = async () => {
    <Link to="/manager" className="link"></Link>;
  };
  return (
    <div className="nav">
      <div className="logo">
        <h2>
          <Link to="/" className="link">
            {" "}
            ChatBot
          </Link>
        </h2>
      </div>

      <div className="username">
        <span> Logged in by user: {user}</span>
      </div>

      <div className="logout">
        {role === "admin" && (
          <Link to="/manager" className="link-manager">
            {" "}
            Manager
          </Link>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default NavBar;
