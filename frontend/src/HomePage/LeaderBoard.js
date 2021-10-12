import React from "react";
import Axios from "axios";
import "./Leaderboard.css";
const LeaderBoard = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    Axios.get("http://localhost:5000/leaderboard").then((response) => {
      setData(response.data);
    });
  }, []);
  return (
    <div>
      <table className="leaderboard-container">
        <thead>
          <tr>
            <td colSpan={3} className="table-heading">
              Leader Board
            </td>
          </tr>
          <tr>
            <th>Rank</th>
            <th>User Name</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{element.user_name}</td>
                <td>{element.rating}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;