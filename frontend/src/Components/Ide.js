import React from "react"
import { useState, useEffect, useRef } from "react"
import './Ide.css';
import GetOutput from "../GetOutput";

function App() {
    const [code, setCode] = useState("");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const codeChange = (e) => {
        setCode(e.target.value);
    }
    const getAns = async () => {
        setOutput("");
        const res = await GetOutput(code, "cpp17", input);
        setOutput(res.output);
        console.log(res);
    }
    return (
        <div className="ide">
            <div className="main-container">
                <div className="code-input-container">
                    <textarea maxLength="16000" id="code-input" className="code-input" autoComplete="off" autoCorrect="off" autoFocus placeholder="Write your Code here" onChange={codeChange}></textarea>
                    <div className="ide-controller">
                        <div className="run-btn-container">
                            <button className="run-btn" onClick={getAns}>Run</button>
                        </div>
                        <div className="submit-btn-container">
                            <button className="submit-btn">Submit</button>
                        </div>
                    </div>
                </div>
                <div className="in-out-container">
                    <div className="output-container" style={{ whiteSpace: pre }}>
                        {output}
                    </div>
                    <div className="input-container">
                        {/* Custom Input */}
                        <input type="text"></input>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default App;