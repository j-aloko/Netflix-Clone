import React, { useContext, useState } from "react";
import "./SingleMoviePage.css";
import PublishIcon from "@mui/icons-material/Publish";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { storage } from "./../../Firebase/Firebase";
import { updateMovie } from "../MoviesPage/MoviesApiCall";
import { moviesContext } from "./../../Context/Movies/MoviesContext";

function SingleMoviePage() {
  const location = useLocation();
  const movie = location.movie;

  const [updatedMovie, setUpdatedMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [img, setImg] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdatedMovie({ ...updatedMovie, [e.target.name]: value });
  };

  const upload = (updatedItems) => {
    updatedItems.forEach((updatedItem) => {
      const uploadTask = storage
        .ref(`/updatedItems/${updatedItem.file.name}`)
        .put(updatedItem.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + " % done");
        },
        (err) => {
          console.log(err);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setUpdatedMovie((prev) => {
              return { ...prev, [updatedItem.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const { dispatch } = useContext(moviesContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovie(updatedMovie, dispatch);
  };

  return (
    <div className="singleMoviePage">
      <div className="movieAndButtonWrapper">
        <h2 className="movieTitle">Movie</h2>
        <Link to="/newMovie">
          <button className="createMovie">Create</button>
        </Link>
      </div>
      <div className="ChartAndMovieInfo">
        <div className="movieInfo">
          <div className="movieProfile">
            <img src={movie?.img} alt="" className="movieImage" />
            <span className="mvieTitle">{movie?.title}</span>
          </div>
          <div className="movieDetailss">
            <div className="movieId">
              <span className="id">id:</span>
              <span className="Amount">{movie?._id}</span>
            </div>
            <div className="movieSales">
              <span className="sales">genre:</span>
              <span className="salesAmount">{movie?.genre}</span>
            </div>
            <div className="activeMovie">
              <span className="active">year:</span>
              <span className="statuss">{movie?.year}</span>
            </div>
            <div className="movieStock">
              <span className="inStock">limit:</span>
              <span className="statusss">{movie?.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="updateWrapper">
        <div className="updateInfo">
          <form action="" className="formContainer">
            <div className="movieItem">
              <label>Movie Title</label>
              <input
                type="text"
                placeholder={movie?.title}
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="movieItem">
              <label>Year</label>
              <input
                type="text"
                placeholder={movie?.year}
                name="year"
                onChange={handleChange}
              />
            </div>
            <div className="movieItem">
              <label>Genre</label>
              <input
                type="text"
                placeholder={movie?.genre}
                name="genre"
                onChange={handleChange}
              />
            </div>
            <div className="movieItem">
              <label>Limit</label>
              <input
                type="text"
                placeholder={movie?.limit}
                name="limit"
                onChange={handleChange}
              />
            </div>
            <div className="movieItem">
              <label>Trailer</label>
              <input
                type="file"
                placeholder={movie?.trailer}
                name="trailer"
                onChange={(e) => setTrailer(e.target.files[0])}
              />
            </div>
            <div className="movieItem">
              <label>video</label>
              <input
                type="file"
                placeholder={movie?.video}
                name="video"
                onChange={(e) => setVideo(e.target.files[0])}
              />
            </div>
          </form>
        </div>
        <div className="imageAndButtonWrapper">
          <div className="imageAndIcon">
            <img src={movie?.img} alt="" className="updateImage" />
            <label htmlFor="file">
              <PublishIcon className="publishIcon" />
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
          {uploaded === 3 ? (
            <button className="updateButton" onClick={handleSubmit}>
              Update
            </button>
          ) : (
            <button className="updateButton" onClick={handleUpload}>
              Upload
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleMoviePage;
