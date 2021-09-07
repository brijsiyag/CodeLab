import React from "react"
import { useState, useEffect, useRef } from "react"
import './Ide.css';
import SelectTags from "./SelectTags";
import RunInfo from "./RunInfo";
import GetOutput from "../GetOutput";

function App() {
    const [code, setCode] = useState("");
    const [lang, setLang] = useState("cpp17");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [fontSize, setFontSize] = useState("14pt")
    const [Status, setStatus] = useState("-")
    const [date, setDate] = useState("-")
    const [time, setTime] = useState("-")
    const [mem, setMem] = useState("-")
    const codeChange = (e) => {
        setCode(e.target.value);
    }
    useEffect(() => {
        document.querySelector("#code-input").addEventListener("keydown", (e) => {
            let currentCursorPos = e.target.selectionStart;
            switch (e.key) {
                case "[":
                    e.preventDefault();
                    setCode(prev => {
                        return prev.slice(0, e.target.selectionStart) + "[]" + prev.slice(e.target.selectionStart, prev.length);
                    })
                    e.target.selectionStart = currentCursorPos + 1;
                    e.target.selectionEnd = currentCursorPos + 1;
                    break;
                case "{":
                    e.preventDefault();
                    setCode(prev => {
                        return prev.slice(0, e.target.selectionStart) + "{}" + prev.slice(e.target.selectionStart, prev.length);
                    })
                    e.target.selectionStart = currentCursorPos + 1;
                    e.target.selectionEnd = currentCursorPos + 1;
                    break;
                case "(":
                    e.preventDefault();
                    setCode(prev => {
                        return prev.slice(0, e.target.selectionStart) + "()" + prev.slice(e.target.selectionStart, prev.length);
                    })
                    e.target.selectionStart = currentCursorPos + 1;
                    e.target.selectionEnd = currentCursorPos + 1;
                    break;
                case "'":
                    e.preventDefault();
                    setCode(prev => {
                        return prev.slice(0, e.target.selectionStart) + "''" + prev.slice(e.target.selectionStart, prev.length);
                    })
                    e.target.selectionStart = currentCursorPos + 1;
                    e.target.selectionEnd = currentCursorPos + 1;
                    break;
                case '"':
                    e.preventDefault();
                    setCode(prev => {
                        return prev.slice(0, e.target.selectionStart) + '""' + prev.slice(e.target.selectionStart, prev.length);
                    })
                    e.target.selectionStart = currentCursorPos + 1;
                    e.target.selectionEnd = currentCursorPos + 1;
                    break;
                default:
                    break;
            }
            if (e.key == "Tab") {
                e.preventDefault();
                setCode(prev => {
                    return prev.slice(0, e.target.selectionStart) + "    " + prev.slice(e.target.selectionStart, prev.length);
                })
                e.target.selectionStart = currentCursorPos + 4;
                e.target.selectionEnd = currentCursorPos + 4;
            }
        })
    }, [])
    const inputChange = (e) => {
        setInput(e.target.value);
    }
    const getAns = async () => {
        setOutput("");
        const res = await GetOutput(code, lang, input);
        setOutput(res.output);
        setStatus(res.Status);
        setTime(res.cpuTime || 0);
        setMem(res.memory || 0);
        setDate(res.date);
        console.log(Status, time, date, mem, output);
    }
    return (
        <div className="ide-container">
            <div className="intro">
                <div className="ide-heading">Code, Compile & Run</div>
                Compile & run your code with the CodeLab online IDE. Our online compiler supports multiple programming languages like Python, C++, C, Kotlin, NodeJS, and many more.
            </div>
            <div className="ide">
                <div className="ide-header">
                    <SelectTags setLang={setLang} setFontSize={setFontSize} />
                    <div>
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <div className="main-container">
                    <div className="code-input-container">
                        <textarea maxLength="16000" id="code-input" className="code-input" autoComplete="off" autoCorrect="off" autoFocus placeholder="Start Coding......" spellcheck="false" onChange={codeChange} style={{ fontSize: fontSize }} value={code}></textarea>
                        <div className="ide-controller">
                            <div className="run-btn-container">
                                <button className="run-btn" onClick={getAns}>Run</button>
                            </div>
                            <div className="submit-btn-container">
                                <button className="submit-btn">Submit</button>
                            </div>
                        </div>
                    </div>
                    <div className="in-out-container" style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <label>Input</label>
                            <textarea className="input-container" id="input-container" spellcheck="false" onChange={inputChange} type="text"></textarea>
                        </div>
                        <div>
                            <label for="output-container" style={{ display: "block" }}>Output</label>
                            <div className="output-container" id="output-container">
                                {output}
                            </div>
                        </div>
                    </div>

                </div>
                <RunInfo Status={Status} date={date} time={time} memory={mem} />
            </div>

        </div>
    );
}
export default App;