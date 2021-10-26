import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import Axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import CodeIcon from "@mui/icons-material/Code";
import AboutUs from "./AboutUs";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import logo from "./codelab.svg";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
Axios.defaults.withCredentials = true;
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginLeft: "20px !important",
    maxWidth: "fit-content !important",
    maxHeight: "fit-content !important",
    minWidth: "fit-content !important",
    minHeight: "fit-content !important",
  },
  title: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
}));

export default function ButtonAppBar({
  loggedIn,
  setLoggedIn,
  isAdmin,
  setIsAdmin,
}) {
  const classes = useStyles();
  const [aboutUs, setAboutUs] = useState(false);
  const History = useHistory();
  const loginClickHandler = () => {
    if (sessionStorage.getItem("LoggedIn") === "true") {
      Axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/logout`)
        .then((res) => {
          if (res.data.success) {
            sessionStorage.removeItem("LoggedIn");
            sessionStorage.removeItem("isAdmin");
            setLoggedIn(false);
            setIsAdmin(false);
            alert("Successfuly Logged Out!!");
          } else {
            alert("Ooops! Something Went Wrong!!!");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      History.push("/login");
    }
  };
  const profileClickHandler = () => {
    Axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/username`).then(
      (res) => {
        if (res.data.success === false) {
          alert(
            "There is some server side Error ! Please try after some time!!"
          );
        } else {
          History.push(`/users/${res.data}`);
        }
      }
    );
  };

  const contactUsClickHandler = () => {
    let confirm = window.confirm("Continue to mail app?");
    if (confirm) {
      let link = document.createElement("a");
      link.href = "mailto:brijsiyag@gmail.com?subject = CodeLab";
      link.click();
    }
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "15vh" }}>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backgroundBlendMode: "darken",
          backdropFilter: "blur(6px)",
          webkitBackdropFilter: "blur(6px)",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              to={{ pathname: "/" }}
              style={{
                textDecoration: "none",
              }}
            >
              <img
                src={logo}
                width="150px"
                style={{ marginTop: "10px", cursor: "pointer" }}
                alt="icon.svg"
              ></img>
            </Link>
          </Typography>
          <Tooltip TransitionComponent={Zoom} title={"Practice"}>
            <Link
              to={{ pathname: "/question" }}
              style={{ color: "white", textDecoration: "none" }}
            >
              <Button size="small" color="primary" variant="contained">
                Practice
              </Button>
            </Link>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title={"IDE"}>
            <Link to={{ pathname: "/ide" }}>
              <Button
                size="small"
                color="primary"
                className={classes.menuButton}
                variant="outlined"
              >
                <CodeIcon />
              </Button>
            </Link>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title={"About Us"}>
            <Button
              size="small"
              color="primary"
              className={classes.menuButton}
              variant="outlined"
              onClick={() => {
                setAboutUs(!aboutUs);
              }}
            >
              <InfoIcon />
            </Button>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title={"Contact Us"}>
            <Button
              size="small"
              className={classes.menuButton}
              variant="outlined"
              onClick={() => {
                contactUsClickHandler();
              }}
            >
              <ContactMailIcon />
            </Button>
          </Tooltip>

          {loggedIn && (
            <Tooltip TransitionComponent={Zoom} title={"Profile"}>
              <Button
                color="primary"
                className={classes.menuButton}
                variant="contained"
                size="small"
                onClick={() => {
                  profileClickHandler();
                }}
              >
                <AccountBoxIcon />
              </Button>
            </Tooltip>
          )}
          {isAdmin && (
            <Tooltip TransitionComponent={Zoom} title={"Admin"}>
              <Button
                color="primary"
                className={classes.menuButton}
                variant="contained"
                size="small"
                onClick={() => {
                  History.push("/admin");
                }}
              >
                <AdminPanelSettingsIcon />
              </Button>
            </Tooltip>
          )}
          <Tooltip
            TransitionComponent={Zoom}
            title={loggedIn ? "Logout" : "Login"}
          >
            <Button
              color="primary"
              className={classes.menuButton}
              variant="contained"
              size="small"
              onClick={loginClickHandler}
            >
              {loggedIn ? <LogoutIcon /> : <LoginIcon />}
            </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <AboutUs aboutUs={aboutUs} setAboutUs={setAboutUs} />
    </Box>
  );
}
