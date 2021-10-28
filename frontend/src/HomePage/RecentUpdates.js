import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./RecentUpdates.css";
import { createNotification } from "../Notification";
import { Link } from "react-router-dom";

const RecentUpdates = () => {
  const [updatesData, setUpdatesData] = useState([]);
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/recentactivities`).then(
      (res) => {
        if (res.data.success === false) {
          return createNotification(res.data.err, "error", 3000);
        }
        setUpdatesData(res.data);
      }
    );
  }, []);
  return (
    <div className="recent-updates-container">
      <h1 className="recent-updates-heading">Important Announcements</h1>
      <ul className="recent-updates-ul">
        {updatesData.map((element) => {
          let s = element.activity;
          let main, before, after;
          let fIndex = s.search(/[(]/),
            sIndex = s.search(/[)]/);
          before = s.slice(0, fIndex + 1);
          main = s.slice(fIndex + 1, sIndex);
          after = s.slice(sIndex, element.activity.length);
          let url;
          s.search("Problem") === -1
            ? (url = `/users/${main}`)
            : (url = `/question/${main}`);
          return (
            <li className="recent-updates-li">
              {before} <Link to={{ pathname: url }}>{main}</Link> {after}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentUpdates;
