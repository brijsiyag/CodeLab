import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import Axios from "axios";

const pieOptions = {
  title: "Submissions",
  pieHole: 0.5,
  slices: [
    {
      color: "#2BB673",
    },
    {
      color: "#d91e48",
    },
    {
      color: "#007fad",
    },
    {
      color: "#e9a227",
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
const PieChart = () => {
  const [data, setData] = React.useState({ ac: 50, wa: 50 });
  React.useEffect(() => {
    Axios.get("/submissions").then((response) => {
      setData(response.data);
    });
  }, []);
  return (
    <div className="App">
      <Chart
        chartType="PieChart"
        data={[
          ["Age", "Weight"],
          ["Accepted", data.wa],
          ["Wrond Answer", data.ac],
        ]}
        options={pieOptions}
        graph_id="PieChart"
        width={"100%"}
        height={"400px"}
        legend_toggle
      />
    </div>
  );
};

export default PieChart;
