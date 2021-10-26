import React from "react";
import Axios from "axios";
import { useParams } from "react-router";
import "./Submission.css";

Axios.defaults.withCredentials = true;

const Submission = () => {
  document.title = "Submission CodeLab";
  const { submission_id } = useParams();
  const [data, setData] = React.useState({});
  React.useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_ADDRESS}/submission/${submission_id}`
    ).then((res) => {
      if (res.data.success === false) {
        setData({
          code: (
            <h2 style={{ margin: "auto", textAlign: "center" }}>
              Please get AC to view others Code
            </h2>
          ),
        });
      } else {
        setData(res.data);
      }
    });
  }, [submission_id]);
  return (
    <div className="submission-page">
      <div className="submission-header">
        <div className="submission-solution-tag">Solution</div>
        <div>Problem :</div>
        <div>User :</div>
      </div>
      <div className="submission-body">
        <div></div>
        <div>{data.code}</div>
      </div>
    </div>
  );
};

export default Submission;
