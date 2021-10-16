import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import green from "@material-ui/core/colors/green";
import { BrowserRouter as Link, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Axios from "axios";
import logo from "./codelab.svg";
Axios.defaults.withCredentials = true;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  customColor: {
    // or hex code, this is normal CSS background-color
    backgroundColor: green[500],
  },
  customHeight: {
    minHeight: 200,
  },
  offset: theme.mixins.toolbar,
}));

export default function ButtonAppBar() {
  let History = useHistory();
  const classes = useStyles();
  const example = "default";
  const isCustomColor = example === "customColor";
  const isCustomHeight = example === "customHeight";
  const [loggedIn, setloggedIn] = React.useState(
    sessionStorage.getItem("LoggedIn") === "true" ? true : false
  );

  const loginClickHandler = () => {
    if (sessionStorage.getItem("LoggedIn") === "true") {
      Axios.get("http://localhost:5000/logout")
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            document.querySelector("#navbar-log-in-out-btn").innerText =
              "LogIn";
            sessionStorage.removeItem("LoggedIn");
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
  return (
    <React.Fragment>
      <AppBar
        color={isCustomColor || isCustomHeight ? "primary" : example}
        className={`${isCustomColor && classes.customColor} ${
          isCustomHeight && classes.customHeight
        }`}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to={{ pathname: "/" }}>
              <img
                src={logo}
                width="150px"
                style={{ marginTop: "10px", cursor: "pointer" }}
                alt="icon.svg"
              ></img>
            </Link>
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => {
              History.push("/question");
            }}
          >
            Practice
          </IconButton>
          <IconButton color="inherit">About Us</IconButton>
          <IconButton color="inherit">Contact Us</IconButton>
          <Button
            variant="contained"
            onClick={loginClickHandler}
            id="navbar-log-in-out-btn"
          >
            {loggedIn ? "Log Out" : "LogIn"}
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
