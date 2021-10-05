import React from "react";
import ImageSlider from "./ImageSlider";
import LeaderBoard from "./LeaderBoard";
import PieChart from "../Profile/PieChart";
const HomePage = () => {
  return (
    <div style={{ marginTop: "50px" }}>
      <ImageSlider />
      <LeaderBoard />
      <PieChart />
    </div>
  );
};

export default HomePage;
