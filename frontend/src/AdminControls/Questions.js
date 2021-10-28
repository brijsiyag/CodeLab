import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import QuestionEditModal from "./QuestionEditModal";
import { createNotification } from "../Notification";
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
  const [isQuestionEditOpen, setIsQuestionEditOpen] = useState(false);
  let [rows, setRows] = useState([]);
  const [questionData, setQuestionData] = useState({});
  const classes = useStyles();
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/questions`).then(
      (res) => {
        if (res.data.success === false) {
          createNotification(res.data.err, "error", 3000);
        } else {
          console.log(res.data);
          res.data.map((element) => {
            let tags = JSON.parse(element.tags);
            delete element.tags;
            element.tags = tags;
          });
          setRows(res.data);
        }
      }
    );
  }, [isQuestionEditOpen]);
  const DeleteQuestion = (index, question_id) => {
    Axios.delete(
      `${process.env.REACT_APP_SERVER_ADDRESS}/question/${question_id}`
    ).then((res) => {
      if (res.data.success === true) {
        rows = rows.filter((item, index1) => index !== index1);
        setRows(rows);
        createNotification("Question Deleted Successfuly...", "success", 3000);
      } else {
        createNotification(res.data.err, "error", 3000);
      }
    });
  };
  return (
    <>
      <QuestionEditModal
        isQuestionEditOpen={isQuestionEditOpen}
        setIsQuestionEditOpen={setIsQuestionEditOpen}
        questionData={questionData}
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
                Question Id
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
                align="center"
              >
                Submissions
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bolder",
                }}
                align="right"
              >
                Tags
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bolder",
                }}
                align="right"
              >
                Difficulty Level
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.question_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bolder" }}
                >
                  <Link to={{ pathname: `/question/${row.question_id}` }}>
                    {row.question_id}
                  </Link>
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.submissions}</TableCell>
                <TableCell align="right">
                  {row.tags.map((element) => {
                    return <span>{element}, </span>;
                  })}
                </TableCell>
                <TableCell align="right">{row.difficulty_level}</TableCell>
                <TableCell>
                  <Button
                    className={classes.menuButton}
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      DeleteQuestion(index, row.question_id);
                    }}
                  >
                    <DeleteForeverIcon color="action" />
                  </Button>
                </TableCell>
                <TableCell id={index}>
                  <Button
                    className={classes.menuButton}
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      let tags = [];
                      rows[index].tags.map((element, index) => {
                        tags.push({ tag: element });
                      });
                      console.log(tags);
                      setQuestionData({ ...rows[index], tags: tags });
                      setIsQuestionEditOpen(!isQuestionEditOpen);
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
          <div className="admin-page-no-questions">No Questions</div>
        )}
      </TableContainer>
    </>
  );
}
