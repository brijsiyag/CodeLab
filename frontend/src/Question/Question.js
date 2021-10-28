import React, { useState } from "react";
import "./Question.css";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import CanvasModal from "./CanvasModal";
import Axios from "axios";
import QuestionBody from "./QuestionBody";
import QuestionSidePanel from "./QuestionSidePanel";
Axios.defaults.withCredentials = true;
const Question = () => {
  const [questionData, setQuestionData] = useState({});
  const { question_id } = useParams();
  const [relatedQuestions, setrelatedQuestions] = useState([]);
  const [isCanvas, setIsCanvas] = useState(false);

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
        <QuestionBody questionData={questionData} question_id={question_id} />
        <QuestionSidePanel
          questionData={questionData}
          relatedQuestions={relatedQuestions}
        />
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
