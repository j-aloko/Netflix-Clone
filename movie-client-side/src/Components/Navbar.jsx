import React, { useContext } from "react";
import "./Navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import { userContext } from "./../ContextApi/userContext";
import { Logout } from "./../ContextApi/ApiCalls/UserApi";

const Navbar = () => {
  const { user, dispatch } = useContext(userContext);

  const handleLogout = () => {
    Logout(dispatch);
  };
  return (
    <div className="navbar">
      <div className="container">
        <div className="left">
          <img
            src="https://www.freepnglogos.com/uploads/netflix-logo-text-emblem-31.png"
            width="200"
            alt="netflix logo text emblem"
          />
          <Link to="/" className="link">
            <span>Homepage</span>
          </Link>
          <Link to="/series" className="link">
            <span>Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span>Movies</span>
          </Link>
          <span>New and Popular</span>
          <span>MyList</span>
        </div>
        <div className="right">
          <SearchIcon className="icons" />
          <span>KIT</span>
          <NotificationsIcon className="icons" />
          <img
            src={
              user?.profilePic ||
              "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-image-icon-default-avatar-profile-icon-social-media-user-vector-image-209162840.jpg"
            }
            alt="Profile"
          />
          <div className="profile">
            <ArrowDropDownIcon className="icons" />
            <div className="options">
              <span>Settings</span>
              <span onClick={handleLogout}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
