import React from "react";
import Chart from "react-google-charts";

const pieOptions = {
  title: "Submissions",
  pieHole: 0.5,
  slices: [
    {
      color: "#2BB673",
    },
    {
      color: "#007fad",
    },
    {
      color: "#e9a227",
    },
    {
      color: "#d91e48",
    },
  ],
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "233238",
      fontSize: 14,
    },
  },
  tooltip: {
    showColorCode: true,
  },
  chartArea: {
    left: 0,
    top: 0,
    width: "100%",
    height: "80%",
  },
  fontName: "Roboto",
};
const Submissions = ({ ac, wa }) => {
  return (
    <div className="App">
      <Chart
        chartType="PieChart"
        data={[
          ["Age", "Weight"],
          ["Accepted", ac],
          ["Wrond Answer", wa],
        ]}
        options={pieOptions}
        graph_id="PieChart"
        width={"100%"}
        height={"100%"}
        legend_toggle
      />
    </div>
  );
};

export default Submissions;
