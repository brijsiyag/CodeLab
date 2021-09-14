import React from 'react'
import data from "./questionData"
import "./Question.css"
import Canvas from './Canvas'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
const Question = () => {
    return (
        <div className="question-page">
            <div className="question-container">
                <h1 className="question-name">{data[0].name}</h1>
                <div className="question-body">{data[0].question}</div>
                <div className="question-input-container" >
                    <h3>Input</h3>
                    <div className="question-input" >{data[0].input}</div>
                </div>
                <div className="question-output-container" >
                    <h3>Output</h3>
                    <div className="question-output" >{data[0].output}</div>
                </div>
                <div className="question-sample-in-out">
                    <h3 className="question-sample-input-heading">Input</h3>
                    <div className="question-sample-input">
                        {data[0].example[0].input}
                    </div>
                    <h3 className="question-sample-output-heading">Output</h3>
                    <div className="question-sample-output">
                        {data[0].example[0].output}
                    </div>
                </div>
                <Link to={{ pathname: `/ide/${data[0].question_id}`, state: data[0].question_id }}><button className="question-submit">Submit</button></Link>
            </div>
            <Canvas />
        </div>
    )
}

export default Question
