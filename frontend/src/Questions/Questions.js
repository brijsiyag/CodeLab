import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useHistory } from "react-router-dom";
import Axios from "axios";
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
    field: "tags",
    headerName: "Tag",
    width: 200,
  },
  {
    field: "difficulty_level",
    headerName: "Difficulty Level",
    width: 200,
  },
];
export default function DataTable() {
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    Axios.get("http://localhost:5000/questions")
      .then((res) => {
        res.data.forEach((element) => {
          element.id = element.question_id;
        });
        console.log(res.data);
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  React.useEffect(() => {}, [rows]);
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
