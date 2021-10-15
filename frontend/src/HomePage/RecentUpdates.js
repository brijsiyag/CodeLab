import React from "react";
import "./RecentUpdates.css";

const RecentUpdates = () => {
  return (
    <div className="recent-updates-container">
      <h1 className="recent-updates-heading">Important Announcements</h1>
      <ul className="recent-updates-ul">
        <li className="recent-updates-li">
          New Problem <b> Enormous Input Test</b> added with tag{" "}
          <b>Graph Theory</b>
        </li>
        <li className="recent-updates-li">
          User <b>brijsiyag</b> Reached Rating 100.
        </li>
        <li className="recent-updates-li">
          New User <b>brijsiyag</b> Joined.
        </li>
        <li className="recent-updates-li">
          New Problem <b> Finding Square Roots</b> added with tag{" "}
          <b>Number Theory</b>
        </li>
        <li className="recent-updates-li">
          New User <b>Lala</b> Joined.
        </li>
        <li className="recent-updates-li">
          New Problem <b> First and Last Digit</b> added with tag{" "}
          <b>Dynamic Programming</b>
        </li>
        <li className="recent-updates-li">
          New Problem <b> Smallest Numbers of Notes</b> added with tag{" "}
          <b>Number Theory</b>
        </li>
      </ul>
    </div>
  );
};

export default RecentUpdates;
