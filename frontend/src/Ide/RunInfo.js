import React from 'react'
import "./RunInfo.css"

const RunInfo = ({ Status, date, time, memory }) => {
    // console.log(Status, date, time, memory);
    return (
        <div className="run-info">
            <div className="status"><span className="heading">Status </span>{Status}</div>
            <div className="date"><span className="heading">Date</span>{date}</div>
            <div className="time"><span className="heading">Time</span>{time} Sec</div>
            <div className="memory"><span className="heading">Mem</span>{memory} kB</div>
        </div>
    )
}

export default RunInfo
