import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const QuestionBody = ({ questionData, question_id }) => {
  return (
    <div className="question-container">
      <div className="question-page-id">
        <Link to={{ pathname: `/question` }}>/questions</Link>/
        {questionData.question_id}
      </div>
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
        <div className="question-sample-input">{questionData.sample_input}</div>
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
  );
};

export default QuestionBody;
