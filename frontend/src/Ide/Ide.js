import React from "react";
import { useState } from "react";
import "./Ide.css";
import SelectTags from "./SelectTags";
import RunInfo from "./RunInfo";
import GetOutput from "../GetOutput";
import AceEditor from "react-ace";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useParams } from "react-router";
import { createNotification } from "../Notification";
import { makeStyles } from "@material-ui/core/styles";
import { StepLabel } from "@mui/material";
import FileNameInput from "./FileNameInput";
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

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginLeft: "20px !important",
    maxWidth: "fit-content !important",
    maxHeight: "fit-content !important",
    minWidth: "fit-content !important",
    minHeight: "fit-content !important",
  },
  title: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
}));

const Ide = () => {
  const classes = useStyles();
  document.title = "IDE CodeLab";
  const { question_id } = useParams();
  const [code, setCode] = useState("");
  const [lang, setLang] = useState("cpp17");
  const [mode, setMode] = useState("c_cpp");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [fontSize, setFontSize] = useState("14pt");
  const [Status, setStatus] = useState("-");
  const [date, setDate] = useState("-");
  const [time, setTime] = useState("-");
  const [mem, setMem] = useState("-");
  const [theme, setTheme] = useState("Chrome");
  const [runInfoShow, setRunInfoShow] = useState(false);
  const [downloadExt, setDownloadExt] = useState(".cpp");
  const [fileName, setFileName] = useState(
    question_id !== undefined ? question_id : "Code"
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const codeChange = (code) => {
    setCode(code);
  };
  const codeCopy = () => {
    navigator.clipboard.writeText(code);
    createNotification("Code copied to clipboard.", "success", 3000);
  };
  const outputCopy = () => {
    navigator.clipboard.writeText(output);
    createNotification("Output copied to clipboard.", "success", 3000);
  };
  const inputCopy = () => {
    navigator.clipboard.writeText(input);
    createNotification("Input copied to clipboard.", "success", 3000);
  };
  const getAns = async (task) => {
    if (task === "run") {
      setOutput("");
      setRunInfoShow(false);
      const res = await GetOutput(code, lang, input, question_id, "run");
      if (res.statusCode >= 400 && res.statusCode < 500) {
        res.Status = res.error;
      } else {
        res.Status = "Successful";
      }
      setOutput(res.output);
      setStatus(res.Status);
      setTime(res.cpuTime || 0);
      setMem(res.memory || 0);
      setDate(res.date);
      setRunInfoShow(true);
    } else {
      setOutput("");
      setRunInfoShow(false);
      const res = await GetOutput(code, lang, input, question_id, "submit");
      if (res.success === false) {
        createNotification(res.err, "error", 3000);
      } else {
        if (res.statusCode >= 400 && res.statusCode < 500) {
          res.Status = res.error;
        } else {
          res.Status = "Successful";
        }
        setOutput(res.output);
        setStatus(res.Status);
        setTime(res.cpuTime || 0);
        setMem(res.memory || 0);
        setDate(res.date);
        setRunInfoShow(true);
        createNotification(
          res.status === "AC"
            ? "All Test Cases Passed"
            : "Some Test cases not Passed",
          res.status === "AC" ? "success" : "info",
          3000
        );
      }
    }
  };
  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `code${downloadExt}`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    createNotification(
      `${fileName}${downloadExt} downloaded.`,
      "success",
      3000
    );
  };
  return (
    <div className="ide-body">
      <FileNameInput
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        fileName={fileName}
        setFileName={setFileName}
        downloadCode={downloadCode}
      />
      <div className="ide-container">
        <div className="intro">
          <div className="ide-heading">Code, Compile & Run</div>
          Compile & run your code with the CodeLab online IDE. Our online
          compiler supports multiple programming languages like Python, C++, C,
          Kotlin, NodeJS, and many more.
        </div>
        <div className="ide">
          <div className="ide-header">
            <SelectTags
              setLang={setLang}
              setFontSize={setFontSize}
              setTheme={setTheme}
              setMode={setMode}
              setDownloadExt={setDownloadExt}
            />
            <div style={{ display: "flex" }}>
              <Button
                onClick={codeCopy}
                variant="outlined"
                className={classes.menuButton}
              >
                <ContentCopyIcon fontSize="small" />
              </Button>
              <Button
                className={classes.menuButton}
                onClick={() => {
                  setDialogOpen(true);
                }}
                style={{ marginRight: "15px" }}
                variant="outlined"
              >
                <DownloadIcon fontSize="small" />
              </Button>
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
                  <Button
                    color="info"
                    variant="contained"
                    onClick={() => {
                      getAns("run");
                    }}
                  >
                    Run
                  </Button>
                </div>
                <div className="submit-btn-container">
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{ display: question_id === undefined && "none" }}
                    onClick={() => {
                      getAns("submit");
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
            <div
              className="in-out-container"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="output-header">
                  <StepLabel htmlFor="output-container">Input</StepLabel>
                  <Button
                    onClick={inputCopy}
                    variant="outlined"
                    className={classes.menuButton}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </Button>
                </div>
                <textarea
                  className="input-container"
                  id="input-container"
                  spellCheck="false"
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  type="text"
                ></textarea>
              </div>
              <div>
                <div className="output-header">
                  <StepLabel htmlFor="output-container">Output </StepLabel>
                  <Button
                    onClick={outputCopy}
                    variant="outlined"
                    className={classes.menuButton}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </Button>
                </div>
                <textarea
                  className="output-container"
                  id="output-container"
                  spellCheck="false"
                  type="text"
                  value={output}
                  disabled
                >
                  {output}
                </textarea>
              </div>
            </div>
          </div>
          {runInfoShow && (
            <RunInfo Status={Status} date={date} time={time} memory={mem} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Ide;
