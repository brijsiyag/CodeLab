import React from "react";
import LeaderBoard from "./LeaderBoard";
import RecentUpdates from "./RecentUpdates";
import "./HomePage.css";
const HomePage = () => {
  document.title = "Home Page CodeLab";
  return (
    <div style={{ marginTop: "50px" }}>
      <div className="home-page-top-page">
        <img
          alt="Main-Pic"
          src="./HomePageMain.svg"
          className="home-page-top-page-image"
        ></img>
        <div className="home-page-top-page-heading-container">
          <div>
            <div className="home-page-top-page-heading">CodeLab</div>
            <div className="home-page-top-page-heading-quote">
              One stop destination for competitive programming
            </div>
          </div>
        </div>
      </div>
      <div className="home-page-middle-container">
        <LeaderBoard />
        <RecentUpdates />
      </div>
    </div>
  );
};

export default HomePage;
