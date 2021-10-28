import React from "react";
import Axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import "./Submission.css";
import { Button } from "@mui/material";
import { createNotification } from "../Notification";

Axios.defaults.withCredentials = true;

const Submission = () => {
  document.title = "Submission CodeLab";
  const { submission_id } = useParams();
  const [data, setData] = React.useState({});
  React.useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_ADDRESS}/submission/${submission_id}`
    ).then((res) => {
      console.log(res.data);
      if (res.data.success === false) {
        setData({
          code: (
            <h2 style={{ margin: "auto", textAlign: "center" }}>
              Please get AC to view others Code
            </h2>
          ),
          success: false,
        });
      } else {
        setData(res.data);
      }
    });
  }, [submission_id]);
  return (
    <div className="submission-page">
      <div className="submission-header">
        <div className="submission-solution-status-tag">
          {data.status === "AC" ? (
            <CheckIcon
              fontSize="large"
              style={{ color: "green", fontWeight: "bolder" }}
            />
          ) : (
            <CloseIcon
              fontSize="large"
              style={{ color: "red", fontWeight: "bolder" }}
            />
          )}
          <div className="submission-solution-tag">Solution</div>
        </div>
        <div>
          Problem :
          <Link to={{ pathname: `/question/${data.question_id}` }}>
            {data.question_id}
          </Link>
        </div>
        <div>
          User :
          <Link to={{ pathname: `/users/${data.username}` }}>
            {data.username}
          </Link>
        </div>
      </div>
      <div className="submission-header-lite">
        <div>time :{data.time}</div>
        <div>lang :{data.lang}</div>
        <div>space :{data.space}</div>
      </div>
      <div className="submission-body">
        <div>{data.code}</div>
        {data.success !== false && (
          <div className="submissions-code-copy">
            <Button
              variant="outlined"
              onClick={() => {
                navigator.clipboard.writeText(data.code);
                createNotification(
                  "Code copied to clipboard.",
                  "success",
                  3000
                );
              }}
            >
              <ContentCopyIcon />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Submission;
