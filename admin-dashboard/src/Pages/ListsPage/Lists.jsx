import React, { useContext, useEffect } from "react";
import "./Lists.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Link } from "react-router-dom";
import { deleteLists, getLists } from "./ListsApiCall";
import { listsContext } from "../../Context/Lists/ListsContext";

function Lists() {
  const { lists, dispatch } = useContext(listsContext);

  useEffect(() => {
    getLists(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteLists(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 300 },

    { field: "title", headerName: "Title", width: 200 },
    {
      field: "type",
      headerName: "Type",
      width: 150,
    },
    {
      field: "genre",
      headerName: "Genre",
      width: 150,
    },

    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="actionRow">
            <Link
              to={{ pathname: "/list/" + params.row._id, list: params.row }}
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
    <div className="listsPage">
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={lists}
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

export default Lists;
