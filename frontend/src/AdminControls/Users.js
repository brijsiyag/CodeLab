import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import UserEditModal from "./UserEditModal";
import { createNotification } from "../Notification";
import { Link } from "react-router-dom";
Axios.defaults.withCredentials = true;
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginLeft: "20px !important",
    maxWidth: "fit-content !important",
    maxHeight: "fit-content !important",
    minWidth: "fit-content !important",
    minHeight: "fit-content !important",
  },
  title: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
}));

export default function BasicTable() {
  let [rows, setRows] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const classes = useStyles();
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/users`).then((res) => {
      if (res.data.success === false) {
        createNotification(res.data.err, "error", 3000);
      } else {
        setRows(res.data);
      }
    });
  }, [isEditOpen]);
  const DeleteUser = (index, username) => {
    Axios.delete(
      `${process.env.REACT_APP_SERVER_ADDRESS}/user/${username}`
    ).then((res) => {
      console.log("HIiiiiiii");
      if (res.data.success === true) {
        rows = rows.filter((item, index1) => index !== index1);
        setRows(rows);
        createNotification("User Deleted Successfuly...", "success", 3000);
      } else {
        createNotification(res.data.err, "error", 3000);
      }
    });
  };
  return (
    <>
      <UserEditModal
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        modalData={modalData}
      />
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "80vw",
          border: "gray 1px solid",
          borderRadius: "10px",
          margin: "auto",
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bolder",
                }}
              >
                No.
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bolder",
                }}
              >
                Username
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bolder",
                }}
                align="right"
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bolder",
                }}
                align="right"
              >
                Rating
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bolder",
                }}
                align="right"
              >
                Institute
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bolder",
                }}
                align="right"
              >
                Country
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.username}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bolder" }}
                >
                  <Link to={{ pathname: `/users/${row.username}` }}>
                    {row.username}
                  </Link>
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.rating}</TableCell>
                <TableCell align="right">{row.institute}</TableCell>
                <TableCell align="right">{row.country}</TableCell>
                <TableCell>
                  <Button
                    className={classes.menuButton}
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      DeleteUser(index, row.username);
                    }}
                  >
                    <DeleteForeverIcon color="action" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    className={classes.menuButton}
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setIsEditOpen(!isEditOpen);
                      setModalData(rows[index]);
                    }}
                  >
                    <EditIcon color="action" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {rows.length === 0 && (
          <div className="admin-page-no-users">No Users</div>
        )}
      </TableContainer>
    </>
  );
}
