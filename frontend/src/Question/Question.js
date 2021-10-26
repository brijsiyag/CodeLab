import React, { useState } from "react";
import "./Question.css";
import Canvas from "./Canvas";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import CanvasModal from "./CanvasModal";
import Axios from "axios";
Axios.defaults.withCredentials = true;
const Question = () => {
  const [questionData, setQuestionData] = useState({});
  const { question_id } = useParams();
  const [relatedQuestions, setrelatedQuestions] = useState([]);
  const [isCanvas, setIsCanvas] = useState(false);
  const History = useHistory();

  React.useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/question/${question_id}`)
      .then((res) => {
        let tags = JSON.parse(res.data.tags);
        delete res.data.tags;
        res.data.tags = tags;
        document.title =
          res.data.name.slice(0, 10) +
          `${res.data.name.length > 10 && "...."}` +
          " CodeLab";
        console.log(res.data.submissions);
        setQuestionData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [question_id]);
  React.useEffect(() => {
    if (questionData.tags !== undefined) {
      Axios.get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/questionlike/${questionData.tags[0]}`
      )
        .then((res) => {
          console.log(res.data);
          setrelatedQuestions(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [questionData]);
  return (
    <div className="question-page">
      <div className="question-upper-part">
        <div className="question-container">
          <div className="question-page-id">/{questionData.question_id}</div>
          <div className="question-heading-container">
            <h1 className="question-name">{questionData.name}</h1>
            <div>Author : {questionData.author}</div>
            <div>Difficulty Level : {questionData.difficulty_level}</div>
            <div>Date : {questionData.date}</div>
          </div>
          <div className="question-body">{questionData.question}</div>
          <div className="question-input-container">
            <h3>Input</h3>
            <div className="question-input">{questionData.input_detail}</div>
          </div>
          <div className="question-output-container">
            <h3>Output</h3>
            <div className="question-output">{questionData.output_detail}</div>
          </div>
          <div className="question-sample-in-out">
            <h3 className="question-sample-input-heading">Input</h3>
            <div className="question-sample-input">
              {questionData.sample_input}
            </div>
            <h3 className="question-sample-output-heading">Output</h3>
            <div className="question-sample-output">
              {questionData.sample_output}
            </div>
          </div>
          <Link
            className="submit-link"
            style={{ textDecoration: "none" }}
            to={{
              pathname: `/ide/${question_id}`,
              state: question_id,
            }}
          >
            <Button variant="contained" type="primary">
              Submit
            </Button>
          </Link>
        </div>
        <div className="question-right-panel">
          <div className="question-tags-main-container">
            <div className="question-tags-heading">Tags</div>
            <div className="question-tags-container">
              {questionData.tags !== undefined &&
                questionData.tags.map((element) => {
                  return <div className="question-single-tag">{element}</div>;
                })}
            </div>
          </div>
          <div className="question-submission-table">
            <h1 className="question-submission-heading">Submissions</h1>
            <table>
              <thead>
                <tr>
                  <td>Time</td>
                  <td>Space</td>
                  <td>User</td>
                  <td>Result</td>
                  <td>Lang</td>
                  <td>Solution</td>
                </tr>
              </thead>
              <tbody>
                {questionData.submissions !== undefined &&
                  questionData.submissions.map((element) => {
                    return (
                      <tr>
                        <td>{element.time}s</td>
                        <td>{element.space}</td>
                        <td style={{ cursor: "pointer" }}>
                          <Link to={{ pathname: `/users/${element.username}` }}>
                            {element.username}
                          </Link>
                        </td>
                        <td>
                          {element.status === "AC" ? (
                            <CheckIcon style={{ color: "green" }} />
                          ) : (
                            <CloseIcon style={{ color: "red" }} />
                          )}
                        </td>
                        <td>{element.lang}</td>
                        <td>
                          <Link
                            to={{
                              pathname: `/submission/${element.submission_id}`,
                            }}
                          >
                            <button style={{ cursor: "pointer" }}>View</button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {questionData.submissions !== undefined &&
              questionData.submissions.length === 0 && (
                <div className="question-no-submissions">No Submissions</div>
              )}
          </div>
          <div className="question-related-questions-main-container">
            <div className="question-related-questions-heading">
              Related Questions
            </div>
            <div className="question-related-questions-container">
              {relatedQuestions.map((element) => {
                if (element.question_id === questionData.question_id) {
                  return;
                }
                return (
                  <Link to={{ pathname: `/question/${element.question_id}` }}>
                    <div className="question-related-single-question">
                      {element.question_id}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Button
        className="question-canvas-button"
        variant="contained"
        onClick={(e) => {
          setIsCanvas(!isCanvas);
        }}
      >
        Canvas
      </Button>
      <CanvasModal isCanvas={isCanvas} setIsCanvas={setIsCanvas} />
    </div>
  );
};

export default Question;
