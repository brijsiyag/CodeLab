import React from "react";
import { useState } from "react";
import "./QuestionAdd.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "50ch",
    },
  },
}));

const QuestionAdd = () => {
  const classes = useStyles();
  const [question_id, setQuestion_id] = useState("");
  const [question, setQuestion] = useState("");
  const [output, setOutput] = useState("");
  const [tags, setTags] = useState("");
  const [difficulty_level, setDifficulty_level] = useState("");
  const [input, setInput] = useState("");

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
    }
  };

  const submitHandler = async () => {
    const res = await fetch("http://localhost:5000/addQuestion", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        question: question,
        question_id: question_id,
        input: input,
        output: output,
        tags: tags,
        difficulty_level: difficulty_level,
      }),
    });
    const result = await res.json();
    console.log(result);
    if (result.error === true) {
      createNotification("error", "Duplicate Question Id", "Error");
    } else {
      createNotification("success", "Question Added Successfuly", "Success");
    }
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
          <TextField
            id="filled-basic"
            label="Question Id"
            variant="outlined"
            onChange={(e) => {
              setQuestion_id(e.target.value);
            }}
          />
          <TextField
            id="filled-basic"
            label="Tags"
            variant="outlined"
            onChange={(e) => {
              setTags(e.target.value);
            }}
          />
          <TextField
            id="filled-basic"
            label="Difficulty Level"
            variant="outlined"
            onChange={(e) => {
              setDifficulty_level(e.target.value);
            }}
          />
        </div>
        <div style={{ width: "100%" }}>
          <TextField
            label="Question"
            variant="outlined"
            id="question"
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
            label="Input"
            variant="outlined"
            multiline
            minRows={10}
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
            minRows={10}
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
