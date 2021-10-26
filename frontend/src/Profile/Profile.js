import React, { useState } from "react";
import Submissions from "./Submissions";
import StarsIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import Axios from "axios";
import { useParams, useHistory, Link } from "react-router-dom";
import "./Profile.css";
import ProfilePic from "./profile.png";
Axios.defaults.withCredentials = true;

const Profile = () => {
  const [userData, setUserData] = useState({
    user: {},
    question_details: [],
    stars: 1,
  });
  const [ac, setAc] = useState(100);
  const [wa, setWa] = useState(0);
  const acWacount = (data) => {
    let acCount = 0,
      waCount = 0;
    data.question_details.forEach((element) => {
      if (element.status === "AC") {
        acCount++;
      } else {
        waCount++;
      }
    });
    setAc(acCount);
    setWa(waCount);
  };
  const { username } = useParams();
  const History = useHistory();
  React.useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_ADDRESS}/userinfo/${username}`
    ).then((res) => {
      res.data.question_details.reverse();
      res.data.stars = parseInt(res.data.user.rating / 300);
      console.log(res.data);
      setUserData(res.data);
      acWacount(res.data);
    });
  }, [username]);
  return (
    <div className="profile-container">
      <div className="profile-main-left">
        <div className="profile-pic-name-container">
          <img src={ProfilePic} alt="Profile-pic" width="100px"></img>
          <h1 className="profile-name">{userData.user.name}</h1>
        </div>
        <div className="profile-user-info">
          <ul>
            <li>
              <label>Username : </label>
              <span>{userData.user.username}</span>
            </li>
            <li>
              <label>Gender : </label>
              <span>{userData.user.gender}</span>
            </li>
            <li>
              <label>Country : </label>
              <span>{userData.user.country}</span>
            </li>
            <li>
              <label>State : </label>
              <span>{userData.user.state}</span>
            </li>
            <li>
              <label>City : </label>
              <span>{userData.user.city}</span>
            </li>
            <li>
              <label>Student/Professional : </label>
              <span>{userData.user.profession}</span>
            </li>
            <li>
              <label>Institution : </label>
              <span>{userData.user.profession}</span>
            </li>
          </ul>
        </div>
        <div>
          <h1>Submissions</h1>
          <div>
            <Submissions ac={ac} wa={wa} />
          </div>
        </div>
      </div>
      <div className="profile-main-right">
        <div className="profile-main-right-upper">
          <h1 className="profile-rating">{userData.user.rating}</h1>
          <div className="profile-stars">
            {[...Array(userData.stars + 1)].map(() => (
              <StarsIcon style={{ color: "blue" }} />
            ))}
          </div>
          <div>CodeLab Rating</div>
          <div className="profile-global-rank-container">
            <h2 className="profile-global-rank">134</h2>
            <div className="profile-global-rank-label">Global Rank</div>
          </div>
        </div>
        <div className="profile-main-right-lower">
          <h2>Recent Activity</h2>
          <div className="profile-recent-activity-container">
            <table>
              <thead>
                <tr>
                  <td>Time</td>
                  <td>Problem</td>
                  <td>Result</td>
                  <td>Lang</td>
                  <td>Solution</td>
                </tr>
              </thead>
              <tbody>
                {userData.question_details.map((element) => {
                  return (
                    <tr>
                      <td>{element.time}s</td>
                      <td style={{ cursor: "pointer" }}>
                        <Link
                          to={{ pathname: `/question/${element.question_id}` }}
                        >
                          {element.question_id}
                        </Link>
                      </td>
                      <td>
                        {element.status === "AC" ? (
                          <CheckIcon
                            style={{ color: "green", fontWeight: "bolder" }}
                          />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
