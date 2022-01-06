import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Watch.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Watch = () => {
  const location = useLocation();
  const movie = location.movie;

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackIcon />
          Home
        </div>
      </Link>
      <video className="video" progress autoPlay controls src={movie.video} />
    </div>
  );
};

export default Watch;
