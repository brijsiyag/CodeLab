import React from "react"
import { useState } from "react"
import './Ide.css';
import SelectTags from "./SelectTags";
import RunInfo from "./RunInfo";
import GetOutput from "../GetOutput";
import AceEditor from "react-ace";
//Syntax Highlighters
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/mode-swift";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-perl6";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-scala";
import "ace-builds/src-noconflict/mode-pascal";
import "ace-builds/src-noconflict/mode-haskell";
import "ace-builds/src-noconflict/mode-objectivec";
import "ace-builds/src-noconflict/mode-groovy";
import "ace-builds/src-noconflict/mode-fortran";
import "ace-builds/src-noconflict/mode-lua";
import "ace-builds/src-noconflict/mode-tcl";
import "ace-builds/src-noconflict/mode-d";
import "ace-builds/src-noconflict/mode-ada";
import "ace-builds/src-noconflict/mode-r";
import "ace-builds/src-noconflict/mode-verilog";
import "ace-builds/src-noconflict/mode-cobol";
import "ace-builds/src-noconflict/mode-dart";
import "ace-builds/src-noconflict/mode-clojure";
import "ace-builds/src-noconflict/mode-scheme";
import "ace-builds/src-noconflict/mode-forth";
import "ace-builds/src-noconflict/mode-prolog";
import "ace-builds/src-noconflict/mode-fsharp";
import "ace-builds/src-noconflict/mode-ocaml";
import "ace-builds/src-noconflict/mode-elixir";
import "ace-builds/src-noconflict/mode-nim";
import "ace-builds/src-noconflict/mode-erlang";
//Themes
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-noconflict/theme-tomorrow_night_bright";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";

const Ide = () => {
    const [code, setCode] = useState("");
    const [lang, setLang] = useState("cpp17");
    const [mode, setMode] = useState("c_cpp")
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [fontSize, setFontSize] = useState("14pt")
    const [Status, setStatus] = useState("-")
    const [date, setDate] = useState("-")
    const [time, setTime] = useState("-")
    const [mem, setMem] = useState("-")
    const [theme, setTheme] = useState("xcode")
    const [runInfoShow, setRunInfoShow] = useState(false)
    const [downloadExt, setDownloadExt] = useState(".cpp")
    const codeChange = (code) => {
        setCode(code);
    }
    const inputChange = (e) => {
        setInput(e.target.value);
    }
    const codeCopy = () => {
        navigator.clipboard.writeText(code);
    }
    const outputCopy = () => {
        navigator.clipboard.writeText(output);
    }
    const inputCopy = () => {
        navigator.clipboard.writeText(input);
    }
    const getAns = async () => {
        setOutput("");
        setRunInfoShow(false);
        const res = await GetOutput(code, lang, input);
        setOutput(res.output);
        setStatus(res.Status);
        setTime(res.cpuTime || 0);
        setMem(res.memory || 0);
        setDate(res.date);
        setRunInfoShow(true);
    }
    const downloadCode = () => {
        const element = document.createElement("a");
        const file = new Blob([code], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `code${downloadExt}`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }
    return (
        <div className="ide-body">
            <div className="ide-container">
                <div className="intro">
                    <div className="ide-heading">Code, Compile & Run</div>
                    Compile & run your code with the CodeLab online IDE. Our online compiler supports multiple programming languages like Python, C++, C, Kotlin, NodeJS, and many more.
                </div>
                <div className="ide">
                    <div className="ide-header">
                        <SelectTags setLang={setLang} setFontSize={setFontSize} setTheme={setTheme} setMode={setMode}
                            setDownloadExt={setDownloadExt}
                        />
                        <div style={{ display: "flex" }}>
                            <button onClick={codeCopy} className="copy-btn">Copy</button>
                            <div onClick={downloadCode} style={{ marginRight: "15px" }}><i class="fas fa-download"></i></div>
                        </div>
                    </div>
                    <div className="main-container">
                        <div className="code-input-container">
                            <AceEditor
                                fontSize={fontSize}
                                className="code-input"
                                mode={mode}
                                theme={theme}
                                onChange={codeChange}
                                name="code-input"
                                editorProps={{ $blockScrolling: true }}
                            />
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
                                <div className="output-header">
                                    <label htmlFor="output-container">Input</label>
                                    <button onClick={inputCopy} className="output-copy-btn">Copy</button>
                                </div>
                                <textarea className="input-container" id="input-container" spellCheck="false" onChange={inputChange} type="text"></textarea>
                            </div>
                            <div>
                                <div className="output-header">
                                    <label htmlFor="output-container">Output </label>
                                    <button onClick={outputCopy} className="output-copy-btn">Copy</button>
                                </div>
                                <textarea className="output-container" id="output-container" spellCheck="false" type="text" value={output} disabled>
                                    {output}
                                </textarea>
                            </div>
                        </div>
                    </div>
                    {runInfoShow && <RunInfo Status={Status} date={date} time={time} memory={mem} />}
                </div>

            </div>
        </div>
    );
}
export default Ide;