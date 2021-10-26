import React from "react";
import { useState } from "react";
import "./QuestionAdd.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Axios from "axios";
import MultiValueInput from "./MultiValueInput";
import "react-notifications/lib/notifications.css";
Axios.defaults.withCredentials = true;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "50ch",
    },
  },
}));

const QuestionAdd = ({ questionData, setIsQuestionEditOpen }) => {
  console.log(questionData);
  document.title = "Add Question CodeLab";
  const classes = useStyles();
  const [question_id, setQuestion_id] = useState(questionData.question_id);
  const [name, setName] = useState(questionData.name);
  const [question, setQuestion] = useState(questionData.question);
  const [outputDetails, setOutputDetails] = useState(
    questionData.output_detail
  );
  const [inputDetails, setInputDetails] = useState(questionData.input_detail);
  const [sampleOutput, setSampleOutput] = useState(questionData.sample_output);
  const [sampleInput, setSampleInput] = useState(questionData.sample_output);
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [tags, setTags] = useState(questionData.tags);
  const [author, setAuthor] = useState(questionData.author);
  const [difficulty_level, setDifficulty_level] = useState(
    questionData.difficulty_level
  );

  const createNotification = (type, message, title) => {
    switch (type) {
      case "info":
        NotificationManager.info(title);
        break;
      case "success":
        NotificationManager.success(message, title);
        break;
      case "warning":
        NotificationManager.warning(message, title, 3000);
        break;
      case "error":
        NotificationManager.error(message, title, 5000);
        break;
      default:
        break;
    }
  };

  const submitHandler = async () => {
    Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/editquestion`, {
      question: question,
      question_id: question_id,
      sampleInput: sampleInput,
      sampleOutput: sampleOutput,
      inputDetails: inputDetails,
      outputDetails: outputDetails,
      input: input,
      output: output,
      author: author,
      tags: JSON.stringify(tags),
      difficulty_level: difficulty_level,
      name: name,
      original_question_id: questionData.question_id,
    }).then((res) => {
      if (res.data.success === false) {
        createNotification("error", res.data.sqlMessage, "Error");
      } else {
        setIsQuestionEditOpen(false);
        alert("Question Updated Successfuly...");
        createNotification("success", "Question Added Successfuly", "Success");
      }
    });
  };

  return (
    <div className="QuestionAdd">
      <h1>Add Question</h1>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        id="question-add-body"
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              id="filled-basic"
              label="Question Name"
              value={name}
              variant="outlined"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              value={question_id}
              id="filled-basic"
              label="Question Id"
              variant="outlined"
              onChange={(e) => {
                setQuestion_id(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              value={author}
              fullWidth
              id="filled-basic"
              label="Author"
              variant="outlined"
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
          </Grid>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={10} sm={5}>
            <MultiValueInput setTags={setTags} tag={questionData.tags} />
          </Grid>
          <Grid item xs={10} sm={5}>
            <Select
              id="difficulty_level"
              value={difficulty_level}
              name="difficulty_level"
              fullWidth
              onChange={(e) => {
                setDifficulty_level(e.target.value);
              }}
            >
              <MenuItem id="easy" value={"Easy"}>
                Easy
              </MenuItem>
              <MenuItem id="medium" value={"Medium"}>
                Medium
              </MenuItem>
              <MenuItem id="hard" value={"Hard"}>
                Hard
              </MenuItem>
            </Select>
          </Grid>
        </div>
        <div style={{ width: "100%" }}>
          <TextField
            label="Question"
            variant="outlined"
            id="question"
            value={question}
            minRows={15}
            fullWidth={true}
            multiline={true}
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
          />
        </div>
        <div style={{ width: "100%", display: "flex" }}>
          <TextField
            id="filled-basic"
            label="Input Details"
            variant="outlined"
            value={inputDetails}
            multiline
            minRows={5}
            fullWidth
            style={{ margin: "0 20px 0 0" }}
            onChange={(e) => {
              setInputDetails(e.target.value);
            }}
          />
          <TextField
            id="filled-basic"
            label="Output Details"
            value={outputDetails}
            variant="outlined"
            multiline
            minRows={5}
            fullWidth
            style={{ margin: "0 0 0 20px" }}
            onChange={(e) => {
              setOutputDetails(e.target.value);
            }}
          />
        </div>
        <div style={{ width: "100%", display: "flex" }}>
          <TextField
            id="filled-basic"
            label="Sample Input"
            variant="outlined"
            value={sampleInput}
            multiline
            minRows={5}
            fullWidth
            style={{ margin: "0 20px 0 0" }}
            onChange={(e) => {
              setSampleInput(e.target.value);
            }}
          />
          <TextField
            id="filled-basic"
            label="Sample Output"
            variant="outlined"
            value={sampleOutput}
            multiline
            minRows={5}
            fullWidth
            style={{ margin: "0 0 0 20px" }}
            onChange={(e) => {
              setSampleOutput(e.target.value);
            }}
          />
        </div>
        <div style={{ width: "100%", display: "flex" }}>
          <TextField
            id="filled-basic"
            label="Input"
            variant="outlined"
            multiline
            minRows={5}
            fullWidth
            style={{ margin: "0 20px 0 0" }}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <TextField
            id="filled-basic"
            label="Output"
            variant="outlined"
            multiline
            minRows={5}
            fullWidth
            style={{ margin: "0 0 0 20px" }}
            onChange={(e) => {
              setOutput(e.target.value);
            }}
          />
        </div>
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={submitHandler}
          className="question-add-submit-btn"
        >
          Submit
        </Button>
      </form>
      <NotificationContainer />
    </div>
  );
};

export default QuestionAdd;
