let exts = {
    java: ".java",
    c: ".c",
    cpp: ".cpp",
    cpp14: ".cpp",
    cpp17: ".cpp",
    python2: ".py",
    python3: ".py",
    kotlin: ".kt",
    swift: ".swift",
    go: ".go",
    bash: ".sh",
    csharp: ".cs",
    nodejs: ".js",
    rust: ".rs",
    sql: ".sql",
    php: ".php",
    perl: ".pl",
    ruby: ".rb",
    scala: ".scala",
    pascal: ".pas",
    vbn: ".vb",
    haskell: ".hs",
    objc: ".m",
    groovy: ".groovy",
    fortran: ".f90",
    brainfuck: ".bf",
    lua: ".lua",
    tcl: ".tcl",
    Hack: ".hh",
    d: ".d",
    ada: ".adb",
    r: ".r",
    freebasic: ".txt",
    verilog: ".v",
    cobol: ".cob",
    dart: ".dart",
    clojure: ".clj",
    scheme: ".scm",
    forth: ".fth",
    prolog: ".pl",
    coffeescript: ".coffee",
    intercal: ".asm",
    nemerle: ".n",
    ocaml: ".ml",
    picoLisp: ".l",
    elixir: ".ex",
    factor: ".factor",
    fantom: ".fan",
    nim: ".nim",
    pike: ".pike",
    smalltalk: ".st",
    lolcode: ".lol",
    racket: ".rkt",
    erlang: ".erl",
}

const langToAce = {
    java: "java", c: "c_cpp", cpp: "c_cpp", cpp14: "c_cpp", cpp17: "c_cpp", python2: "python", python3: "python", kotlin: "kotlin", swift: "swift", go: "golang", csharp: "csharp", nodejs: "javascript", rust: "rust", sql: "sql", php: "php", c99: "c_cpp", perl: "perl6", ruby: "ruby", scala: "scala", pascal: "pascal", haskell: "haskell", objc: "objectivec", groovy: "groovy", fortran: "fortran", lua: "lua", tcl: "tcl", d: "d", ada: "ada", r: "r", verilog: "verilog", cobol: "cobol", dart: "dart", clojure: "clojure", scheme: "scheme", forth: "forth", prolog: "prolog", fsharp: "fsharp", ocaml: "ocaml", rhino: "javascript", elixir: "elixir", nim: "nim", erlang: "erlang", hack: "php"
}

export default { langToAce, exts };