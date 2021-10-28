import React, { useState } from "react";
import Submissions from "./Submissions";
import StarsIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import UserEditModal from "../AdminControls/UserEditModal";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./Profile.css";
import ProfilePic from "./profile.png";
import { Button } from "@mui/material";
import { createNotification } from "../Notification";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";
Axios.defaults.withCredentials = true;

const Profile = () => {
  const [userData, setUserData] = useState({
    user: {},
    question_details: [],
    stars: 1,
  });
  const [isProfileEditModal, setisProfileEditModal] = useState(false);
  const [usernameFromServer, setUsernameFromServer] = useState("");
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
    if (acCount === 0 && waCount === 0) {
      acCount = 1;
      waCount = 1;
    }
    setAc(acCount);
    setWa(waCount);
  };
  const { username } = useParams();

  React.useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/username`).then(
      (res) => {
        if (res.data.success === false) {
          createNotification(res.data.err, "error", 3000);
        } else {
          setUsernameFromServer(res.data);
        }
      }
    );
    Axios.get(
      `${process.env.REACT_APP_SERVER_ADDRESS}/userinfo/${username}`
    ).then((res) => {
      res.data.question_details.reverse();
      res.data.stars = parseInt(res.data.user.rating / 300);
      console.log(res.data);
      setUserData(res.data);
      acWacount(res.data);
    });
  }, [username, isProfileEditModal]);
  return (
    <>
      <UserEditModal
        isEditOpen={isProfileEditModal}
        setIsEditOpen={setisProfileEditModal}
        modalData={userData.user}
      />
      <div className="profile-container">
        <div className="profile-main-left">
          <div className="profile-pic-name-container">
            <img src={ProfilePic} alt="Profile-pic" width="100px"></img>
            <div className="profile-name">{userData.user.name}</div>{" "}
            {username === usernameFromServer && (
              <Button
                onClick={() => setisProfileEditModal(!isProfileEditModal)}
                size="small"
              >
                <EditIcon />
              </Button>
            )}
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
                <span>{userData.user.institute}</span>
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
              <h2 className="profile-global-rank">
                {userData.user.global_rank}
              </h2>
              <div className="profile-global-rank-label">Global Rank</div>
            </div>
          </div>
          <div className="profile-main-right-lower">
            <h2>Recent Activity</h2>
            <TableContainer
              component={Paper}
              sx={{
                maxWidth: "fit-content",
                border: "gray 1px solid",
                overflow: "auto",
                margin: "auto",
              }}
            >
              <Table className="profile-recent-activity-container">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bolder",
                        padding: "5px",
                        paddingLeft: "5px",
                      }}
                    >
                      Time.
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bolder",
                        padding: "5px",
                      }}
                    >
                      Problem
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bolder",
                        padding: "5px",
                      }}
                      align="right"
                    >
                      Result
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bolder",
                        padding: "5px",
                      }}
                      align="center"
                    >
                      Lang
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bolder",
                        padding: "5px",
                        paddingRight: "5px",
                      }}
                      align="right"
                    >
                      Solution
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userData.question_details.map((element) => {
                    return (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          sx={{
                            fontWeight: "bolder",
                            padding: "5px",
                            paddingLeft: "5px",
                          }}
                          align="right"
                        >
                          {element.time === null ? "0.00" : element.time}s
                        </TableCell>
                        <TableCell
                          sx={{
                            padding: "5px",
                          }}
                          align="right"
                        >
                          <Link
                            to={{
                              pathname: `/question/${element.question_id}`,
                            }}
                          >
                            {element.question_id}
                          </Link>
                        </TableCell>
                        <TableCell
                          sx={{
                            padding: "5px",
                          }}
                          align="right"
                        >
                          {element.status === "AC" ? (
                            <CheckIcon
                              style={{ color: "green", fontWeight: "bolder" }}
                            />
                          ) : (
                            <CloseIcon style={{ color: "red" }} />
                          )}
                        </TableCell>
                        <TableCell
                          sx={{
                            padding: "5px",
                          }}
                          align="right"
                        >
                          {element.lang}
                        </TableCell>
                        <TableCell
                          sx={{
                            padding: "5px",
                            paddingRight: "5px",
                          }}
                          align="right"
                        >
                          <Link
                            to={{
                              pathname: `/submission/${element.submission_id}`,
                            }}
                          >
                            <button style={{ cursor: "pointer" }}>View</button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {userData.question_details !== undefined &&
                userData.question_details.length === 0 && (
                  <div className="users-no-submissions">No Submissions</div>
                )}
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
