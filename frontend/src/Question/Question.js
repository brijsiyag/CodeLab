import React from "react";
import data from "./questionData";
import "./Question.css";
import Canvas from "./Canvas";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useParams,
} from "react-router-dom";
import Axios from "axios";
Axios.defaults.withCredentials = true;
const Question = () => {
  const [questionData, setQuestionData] = React.useState({});
  const { question_id } = useParams();
  React.useEffect(() => {
    Axios.get(`http://localhost:5000/question/${question_id}`).then((res) => {
      console.log(res.data);
      setQuestionData(res.data);
    });
  }, []);
  return (
    <div className="question-page">
      <div className="question-container">
        <h1 className="question-name">{questionData.name}</h1>
        <div className="question-body">{questionData.question}</div>
        <div className="question-input-container">
          <h3>Input</h3>
          <div className="question-input">{questionData.input}</div>
        </div>
        <div className="question-output-container">
          <h3>Output</h3>
          <div className="question-output">{questionData.output}</div>
        </div>
        <div className="question-sample-in-out">
          <h3 className="question-sample-input-heading">Input</h3>
          <div className="question-sample-input">
            {questionData.sampleInput}
          </div>
          <h3 className="question-sample-output-heading">Output</h3>
          <div className="question-sample-output">
            {questionData.sampleOutput}
          </div>
        </div>
        <Link
          to={{
            pathname: `/ide/${question_id}`,
            state: question_id,
          }}
        >
          <button className="question-submit">Submit</button>
        </Link>
      </div>
      <Canvas />
    </div>
  );
};

export default Question;
