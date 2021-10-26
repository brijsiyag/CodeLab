import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Axios from "axios";
import Users from "./Users";
import Questions from "./Questions";
import { Link } from "react-router-dom";
import "./AdminPage.css";
Axios.defaults.withCredentials = true;
const AdminPage = () => {
  return (
    <div className="admin-page-main-container">
      <Button variant="outlined" color="primary">
        <Link
          style={{ textDecoration: "none" }}
          to={{ pathname: "/add-question" }}
        >
          Add Question
        </Link>
      </Button>
      <div>
        <Typography variant="h4" align="center" component="h2" margin="20px">
          Users
        </Typography>
        <Users />
      </div>
      <div>
        <Typography variant="h4" component="h2" align="center" margin="20px">
          Questions
        </Typography>
        <Questions />
      </div>
    </div>
  );
};

export default AdminPage;
