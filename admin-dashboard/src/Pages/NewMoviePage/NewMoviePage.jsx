import React, { useContext, useState, useEffect } from "react";
import "./NewMoviePage.css";
import { storage } from "../../Firebase/Firebase";
import { postMovie } from "./../MoviesPage/MoviesApiCall";
import { moviesContext } from "./../../Context/Movies/MoviesContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router-dom";

function NewMoviePage() {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgThumbnail, setImgThumbnail] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);
  const [error, setError] = useState(false);

  const history = useHistory();

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const upload = (items) => {
    try {
      setLoading(true);
      items.forEach((item) => {
        const uploadTask = storage
          .ref(`/items/${item.file.name}`)
          .put(item.file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setStatus(progress);
          },
          (err) => {
            console.log(err);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
              setMovie((prev) => {
                return { ...prev, [item.label]: url };
              });
              setUploaded((prev) => prev + 1);
            });
          }
        );
      });
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    if (uploaded === 5) {
      setLoading(false);
    }
  }, [uploaded]);

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgThumbnail, label: "imgThumbnail" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const { dispatch, isFetching } = useContext(moviesContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    postMovie(movie, dispatch);
    history.push("/movies");
  };

  return (
    <div className="newMoviePage">
      <h1 className="newMovieTitle">Post a New Movie/Series</h1>
      <form action="" className="uploadForm">
        <div className="uploadContainer">
          <label htmlFor="file">Image</label>
          <input
            type="file"
            id="img"
            name="image"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="uploadContainer">
          <label htmlFor="file">Title Image</label>
          <input
            type="file"
            id="imgTitle"
            name="titleImage"
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>
        <div className="uploadContainer">
          <label htmlFor="file">Thumbnail Image </label>
          <input
            type="file"
            id="imgThumbnail"
            name="thumbnail"
            onChange={(e) => setImgThumbnail(e.target.files[0])}
          />
        </div>
        <div className="uploadItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Movie Title"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="uploadItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="uploadItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="2021"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="uploadItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Acton,Drama,Comedy"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="uploadItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="16+"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="uploadItem">
          <label>isSeries</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option>Yes / No ?</option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="uploadItem">
          <label>Trailer</label>
          <input
            type="file"
            style={{ border: "none" }}
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>
        <div className="uploadItem">
          <label>Video</label>
          <input
            type="file"
            style={{ border: "none" }}
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
      </form>
      {uploaded === 5 ? (
        <button className="createNewMovie" onClick={handleSubmit}>
          {isFetching ? <CircularProgress color="success" /> : "Create"}
        </button>
      ) : (
        <button className="createNewMovie" onClick={handleUpload}>
          {loading ? (
            <CircularProgress color="success" value={status} />
          ) : (
            "Upload"
          )}
        </button>
      )}
      {error && (
        <span className="errorBoundary">
          Something Went Wrong!! Unable to Upload
        </span>
      )}
    </div>
  );
}

export default NewMoviePage;
