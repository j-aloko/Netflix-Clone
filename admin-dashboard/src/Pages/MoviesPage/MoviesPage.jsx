import React, { useContext, useEffect } from "react";
import "./MoviesPage.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "./MoviesApiCall";
import { moviesContext } from "./../../Context/Movies/MoviesContext";

function MoviesPage() {
  const { movies, dispatch } = useContext(moviesContext);

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "movie",
      headerName: "Movie",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="userRowProfile">
            <img src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 160 },
    {
      field: "year",
      headerName: "Year",
      width: 140,
    },
    {
      field: "limit",
      headerName: "Limit",
      width: 160,
    },

    {
      field: "isSeries",
      headerName: "isSeries",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="actionRow">
            <Link
              to={{ pathname: "/movie/" + params.row._id, movie: params.row }}
            >
              <button className="edit">Edit</button>
            </Link>
            <DeleteForeverOutlinedIcon
              className="icon"
              onClick={() => handleDelete(params.row._id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="moviesPage">
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={movies}
          columns={columns}
          pageSize={8}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(r) => r._id}
        />
      </div>
    </div>
  );
}

export default MoviesPage;
