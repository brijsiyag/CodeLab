import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./RecentUpdates.css";

const RecentUpdates = () => {
  const [updatesData, setUpdatesData] = useState([]);
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/recentactivities`).then(
      (res) => {
        if (res.data.success === false) {
          return alert("Some Error in Server Side!!");
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
          return <li className="recent-updates-li">{element.activity}</li>;
        })}
      </ul>
    </div>
  );
};

export default RecentUpdates;
