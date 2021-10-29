import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import CanvasModal from "./CanvasModal";
const QuestionSidePanel = ({ questionData, relatedQuestions }) => {
  const [isCanvas, setIsCanvas] = useState(false);
  return (
    <div className="question-right-panel">
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
                    <td>{element.time === null ? "0.00" : element.time}s</td>
                    <td>{element.space === null ? "0" : element.space}</td>
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
  );
};

export default QuestionSidePanel;
