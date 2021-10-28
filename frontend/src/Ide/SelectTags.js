import React from "react";
import "./SelectTags.css";
import { langToAce, exts } from "./LangData";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Input, TextField } from "@mui/material";
const SelectTags = ({
  setLang,
  setFontSize,
  setTheme,
  setMode,
  setDownloadExt,
}) => {
  const selectChangeLang = (e) => {
    const lang = e.target.value;
    const langext = exts[lang];
    if (langext !== undefined) {
      setDownloadExt(langext);
    } else {
      setDownloadExt(".txt");
    }
    setLang(lang);
    setMode(langToAce[lang]);
  };
  const selectChangeFontSize = (e) => {
    setFontSize(e.target.value + "pt");
  };
  const selectChangeTheme = (e) => {
    setTheme(e.target.value);
  };
  return (
    <div style={{ display: "flex" }} className="SelectTags">
      <FormControl
        variant="standard"
        sx={{ minWidth: 120, fontSize: "10px", margin: "0 5px 0 10px" }}
      >
        <InputLabel sx={{ fontSize: "1rem" }} id="language">
          Language
        </InputLabel>
        <Select
          sx={{ fontSize: "0.7rem" }}
          labelId="language"
          onChange={selectChangeLang}
          defaultValue="cpp17"
          label="Age"
        >
          <MenuItem value="java">Java</MenuItem>
          <MenuItem value="c">C</MenuItem>
          <MenuItem value="cpp">C++</MenuItem>
          <MenuItem value="cpp14">C++ 14</MenuItem>
          <MenuItem value="cpp17">C++ 17</MenuItem>
          <MenuItem value="python2">Python 2</MenuItem>
          <MenuItem value="python3">Python 3</MenuItem>
          <MenuItem value="kotlin">Kotlin</MenuItem>
          <MenuItem value="swift">Swift</MenuItem>
          <MenuItem value="go">Go Lang</MenuItem>
          <MenuItem value="bash">Bash Shell</MenuItem>
          <MenuItem value="csharp">C#</MenuItem>
          <MenuItem value="nodejs">NodeJS</MenuItem>
          <MenuItem value="rust">RUST</MenuItem>
          <MenuItem value="sql">SQL</MenuItem>
          <MenuItem value="php">PHP</MenuItem>
          <MenuItem value="c99">C-99</MenuItem>
          <MenuItem value="perl">Perl</MenuItem>
          <MenuItem value="ruby">Ruby</MenuItem>
          <MenuItem value="scala">Scala</MenuItem>
          <MenuItem value="pascal">Pascal</MenuItem>
          <MenuItem value="vbn">VB.Net</MenuItem>
          <MenuItem value="haskell">Haskell</MenuItem>
          <MenuItem value="objc">Objective C </MenuItem>
          <MenuItem value="groovy">Groovy</MenuItem>
          <MenuItem value="fortran">Fortran</MenuItem>
          <MenuItem value="brainfuck">Brainfuck</MenuItem>
          <MenuItem value="lua">Lua</MenuItem>
          <MenuItem value="tcl">TCL</MenuItem>
          <MenuItem value="hack">Hack</MenuItem>
          <MenuItem value="d">D</MenuItem>
          <MenuItem value="ada">Ada</MenuItem>
          <MenuItem value="r">R Language</MenuItem>
          <MenuItem value="freebasic">Free Basic</MenuItem>
          <MenuItem value="verilog">Verilog</MenuItem>
          <MenuItem value="cobol">Cobol</MenuItem>
          <MenuItem value="dart">Dart</MenuItem>
          <MenuItem value="yabasic">YaBasic</MenuItem>
          <MenuItem value="clojure">Clojure</MenuItem>
          <MenuItem value="scheme">Scheme</MenuItem>
          <MenuItem value="forth">Forth</MenuItem>
          <MenuItem value="prolog">Prolog</MenuItem>
          <MenuItem value="octave">Octave</MenuItem>
          <MenuItem value="coffeescript">CoffeeScript</MenuItem>
          <MenuItem value="icon">Icon</MenuItem>
          <MenuItem value="fsharp">F#</MenuItem>
          <MenuItem value="nasm">Assembler - NASM</MenuItem>
          <MenuItem value="intercal">Intercal</MenuItem>
          <MenuItem value="nemerle">Nemerle</MenuItem>
          <MenuItem value="ocaml">Ocaml</MenuItem>
          <MenuItem value="unlambda">Unlambda</MenuItem>
          <MenuItem value="picolisp">Picolisp</MenuItem>
          <MenuItem value="spidermonkey">SpiderMonkey</MenuItem>
          <MenuItem value="rhino">Rhino JS</MenuItem>
          <MenuItem value="bc">BC</MenuItem>
          <MenuItem value="clisp">Clisp</MenuItem>
          <MenuItem value="elixir">Elixir</MenuItem>
          <MenuItem value="factor">Factor</MenuItem>
          <MenuItem value="falcon">Falcon</MenuItem>
          <MenuItem value="fantom">Fantom</MenuItem>
          <MenuItem value="nim">Nim</MenuItem>
          <MenuItem value="pike">Pike</MenuItem>
          <MenuItem value="smalltalk">SmallTalk</MenuItem>
          <MenuItem value="mozart">OZ Mozart</MenuItem>
          <MenuItem value="lolcode">LoL Code</MenuItem>
          <MenuItem value="racket">Racket</MenuItem>
          <MenuItem value="whitespace">WhiteSpace</MenuItem>
          <MenuItem value="erlang">Erlang</MenuItem>
          <MenuItem value="jlang">J</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ maxWidth: 80, margin: "0 5px" }}>
        <InputLabel sx={{ fontSize: "1rem" }} id="theme">
          Font Size
        </InputLabel>
        <Input
          sx={{ fontSize: "0.7rem" }}
          label="Font Size"
          type="number"
          variant="standard"
          onChange={selectChangeFontSize}
          defaultValue={14}
        ></Input>
      </FormControl>
      <FormControl variant="standard" sx={{ minWidth: 120, margin: "0 5px" }}>
        <InputLabel sx={{ fontSize: "1rem" }} id="theme">
          Theme
        </InputLabel>
        <Select
          sx={{ fontSize: "0.7rem" }}
          labelId="theme"
          onChange={selectChangeTheme}
          defaultValue="chrome"
        >
          <MenuItem value="chrome">Chrome</MenuItem>
          <MenuItem value="monokai">Monokai</MenuItem>
          <MenuItem value="tomorrow">Tomorrow</MenuItem>
          <MenuItem value="tomorrow_night">Tomorrow Night</MenuItem>
          <MenuItem value="tomorrow_night_eighties">
            Tomorrow Night Eighties
          </MenuItem>
          <MenuItem value="tomorrow_night_bright">
            Tomorrow Night Bright
          </MenuItem>
          <MenuItem value="solarized_light">Solarized Light</MenuItem>
          <MenuItem value="solarized_dark">Solarized Dark</MenuItem>
          <MenuItem value="cobalt">Cobalt</MenuItem>
          <MenuItem value="twilight">Twilight</MenuItem>
          <MenuItem value="xcode">Xcode</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectTags;
