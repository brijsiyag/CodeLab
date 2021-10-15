import * as React from "react";
import { checkGridRowIdIsValid, DataGrid, GridRow } from "@mui/x-data-grid";
import data from "./QuestionDB";
import { useHistory } from "react-router-dom";
import { TableRow } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
const columns = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "id", headerName: "Id", width: 200, sortable: false },
  {
    field: "submissions",
    headerName: "Submissions",
    width: 200,
    type: "number",
  },
  {
    field: "tag",
    headerName: "Tag",
    width: 200,
  },
  {
    field: "difficulty_level",
    headerName: "Difficulty Level",
    width: 200,
  },
];

const rows = [...data];

export default function DataTable() {
  const History = useHistory();
  return (
    <div
      style={{
        border: "1px solid gray",
        borderRadius: "5px",
        padding: "10px",
        boxShadow: "gray 0 0 10px 0px",
        width: "80vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
        marginTop: "10vh",
      }}
    >
      <h1>Practice</h1>
      <div style={{ height: "80vh", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
          onRowClick={(element) => {
            History.push(`/question/${element.id}`);
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
}
