import React from 'react'
import "./SelectTags.css"
import LangData from './LangData'
const SelectTags = ({ setLang, setFontSize, setTheme, setMode, setDownloadExt }) => {
    const selectChangeLang = (e) => {
        const lang = e.target.value;
        const langext = LangData.exts[lang];
        if (langext !== undefined) {
            setDownloadExt(langext);
        }
        else {
            setDownloadExt(".txt");
        }
        setLang(lang);
        setMode(LangData.langToAce[lang])
    }
    const selectChangeFontSize = (e) => {
        setFontSize(e.target.value + "pt");
    }
    const selectChangeTheme = (e) => {
        setTheme(e.target.value);
    }
    return (
        <div style={{ display: "flex" }}>
            <div>
                <label htmlFor="language" className="lang-label">Language:</label>
                <select id='language' onChange={selectChangeLang} defaultValue="cpp17">
                    <option value="java">Java</option>
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                    <option value="cpp14">C++ 14</option>
                    <option value="cpp17">C++ 17</option>
                    <option value="python2">Python 2</option>
                    <option value="python3">Python 3</option>
                    <option value="kotlin">Kotlin</option>
                    <option value="swift">Swift</option>
                    <option value="go">Go Lang</option>
                    <option value="bash">Bash Shell</option>
                    <option value="csharp">C#</option>
                    <option value="nodejs">NodeJS</option>
                    <option value="rust">RUST</option>
                    <option value="sql">SQL</option>
                    <option value="php">PHP</option>
                    <option value="c99">C-99</option>
                    <option value="perl">Perl</option>
                    <option value="ruby">Ruby</option>
                    <option value="scala">Scala</option>
                    <option value="pascal">Pascal</option>
                    <option value="vbn">VB.Net</option>
                    <option value="haskell">Haskell</option>
                    <option value="objc">Objective C </option>
                    <option value="groovy">Groovy</option>
                    <option value="fortran">Fortran</option>
                    <option value="brainfuck">Brainfuck</option>
                    <option value="lua">Lua</option>
                    <option value="tcl">TCL</option>
                    <option value="hack">Hack</option>
                    <option value="d">D</option>
                    <option value="ada">Ada</option>
                    <option value="r">R Language</option>
                    <option value="freebasic">Free Basic</option>
                    <option value="verilog">Verilog</option>
                    <option value="cobol">Cobol</option>
                    <option value="dart">Dart</option>
                    <option value="yabasic">YaBasic</option>
                    <option value="clojure">Clojure</option>
                    <option value="scheme">Scheme</option>
                    <option value="forth">Forth</option>
                    <option value="prolog">Prolog</option>
                    <option value="octave">Octave</option>
                    <option value="coffeescript">CoffeeScript</option>
                    <option value="icon">Icon</option>
                    <option value="fsharp">F#</option>
                    <option value="nasm">Assembler - NASM</option>
                    <option value="intercal">Intercal</option>
                    <option value="nemerle">Nemerle</option>
                    <option value="ocaml">Ocaml</option>
                    <option value="unlambda">Unlambda</option>
                    <option value="picolisp">Picolisp</option>
                    <option value="spidermonkey">SpiderMonkey</option>
                    <option value="rhino">Rhino JS</option>
                    <option value="bc">BC</option>
                    <option value="clisp">Clisp</option>
                    <option value="elixir">Elixir</option>
                    <option value="factor">Factor</option>
                    <option value="falcon">Falcon</option>
                    <option value="fantom">Fantom</option>
                    <option value="nim">Nim</option>
                    <option value="pike">Pike</option>
                    <option value="smalltalk">SmallTalk</option>
                    <option value="mozart">OZ Mozart</option>
                    <option value="lolcode">LoL Code</option>
                    <option value="racket">Racket</option>
                    <option value="whitespace">WhiteSpace</option>
                    <option value="erlang">Erlang</option>
                    <option value="jlang">J</option>
                </select >
            </div >
            <div>
                <label htmlFor="fontSize" className="lang-label">Font Size:</label>
                <input type="number" id="fontSize" onChange={selectChangeFontSize} defaultValue="14"></input>
            </div>
            <div>
                <label htmlFor="theme" className="theme-label">Theme:</label>
                <select id='theme' onChange={selectChangeTheme} defaultValue="Chrome">
                    <option value="chrome">Chrome</option>
                    <option value="monokai">Monokai</option>
                    <option value="tomorrow">Tomorrow</option>
                    <option value="tomorrow_night">Tomorrow Night</option>
                    <option value="tomorrow_night_eighties">Tomorrow Night Eighties</option>
                    <option value="tomorrow_night_bright">Tomorrow Night Bright</option>
                    <option value="solarized_light">Solarized Light</option>
                    <option value="solarized_dark">Solarized Dark</option>
                    <option value="cobalt">Cobalt</option>
                    <option value="twilight">Twilight</option>
                    <option value="xcode">Xcode</option>
                </select>
            </div>
        </div >
    )
}

export default SelectTags
