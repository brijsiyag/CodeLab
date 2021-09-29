import React from "react";
import "./Canvas.css";
const Canvas = () => {
    React.useEffect(() => {
        document.querySelector(".canvas-pencil-bar").addEventListener("mouseleave", (e) => {
            document.querySelector(".canvas-pencil-bar").classList.toggle("display-none");
        })
        const canvas = document.querySelector("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = (7 * window.innerWidth) / 10;
        canvas.height = (7 * window.innerHeight) / 10;
        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        let pencilColor = "black", pencilSize = 3, prePencilColor = "black", prePencilSize = 3, cursor = "cell", isPencil = true, shapeInitial = {
            x: undefined,
            y: undefined
        }, shape = "rect";
        ctx.beginPath();
        let drawing = false;
        let hidden = false;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fill();
        const draw = (e) => {
            ctx.lineWidth = pencilSize;
            ctx.lineCap = "round";
            ctx.strokeStyle = pencilColor;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            ctx.moveTo(e.offsetX, e.offsetY);
        };
        window.addEventListener("mousemove", (e) => {
            if (drawing && !hidden && isPencil) {
                draw(e);
            }
        });
        canvas.addEventListener("mousedown", (e) => {
            drawing = true;
            if (isPencil) {
                draw(e);
                ctx.beginPath();
                ctx.arc(e.offsetX, e.offsetY, pencilSize / 16, 0, Math.PI * 2);
                ctx.stroke();
                ctx.strokeStyle = "black";
                ctx.fillStyle = "black";
                ctx.fill();
                ctx.closePath();
            }
            else {
                shapeInitial.x = e.offsetX;
                shapeInitial.y = e.offsetY;
            }
        });
        canvas.addEventListener("mouseenter", () => {
            canvas.style.cursor = cursor;
        })
        canvas.addEventListener("mouseout", (e) => {
            drawing = false;
            ctx.beginPath();
            canvas.style.cursor = "default";
        });
        window.addEventListener("mouseup", (e) => {
            drawing = false;
            ctx.beginPath();
            if (!isPencil) {
                if (shape === "rect") {
                    ctx.strokeStyle = pencilColor;
                    ctx.strokeRect(shapeInitial.x, shapeInitial.y, e.offsetX - shapeInitial.x, e.offsetY - shapeInitial.y);
                    ctx.stroke();
                    ctx.closePath();
                    ctx.beginPath();
                }
                else if (shape === "line") {
                    ctx.beginPath();
                    ctx.lineWidth = pencilSize;
                    ctx.strokeStyle = pencilColor;
                    ctx.moveTo(shapeInitial.x, shapeInitial.y);
                    ctx.lineTo(e.offsetX, e.offsetY);
                    ctx.stroke();
                    ctx.closePath();
                    ctx.beginPath();
                }
                else if (shape === "circle") {
                    let radius = Math.pow(Math.pow((e.offsetX - shapeInitial.x), 2) + Math.pow((e.offsetY - shapeInitial.y), 2), 0.5) / 2;
                    ctx.beginPath();
                    ctx.arc(shapeInitial.x + (e.offsetX - shapeInitial.x) / 2, shapeInitial.y + (e.offsetY - shapeInitial.y) / 2, radius, 0, Math.PI * 2);
                    ctx.strokeStyle = pencilColor;
                    ctx.stroke();
                    ctx.closePath();
                    ctx.beginPath();
                }
                isPencil = true;
            }
        });
        document.querySelector("#clear-canvas").addEventListener("click", () => {
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fill();
        });
        document.querySelector("#canvas-download").addEventListener("click", () => {
            var link = document.getElementById("canvas-download");
            link.setAttribute("download", "Rough.jpg");
            link.setAttribute(
                "href",
                canvas.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream")
            );
            link.click();
        });
        document.querySelector(".pencil").addEventListener("click", () => {
            const element = document.querySelector(".pencil");
            if (!element.classList.contains("selected")) {
                document.querySelector(".selected").classList.remove("selected");
                element.classList.add("selected");
                pencilColor = prePencilColor;
                pencilSize = prePencilSize;
                cursor = "cell";
            }
            isPencil = true;
        })
        document.querySelector(".eraser").addEventListener("click", () => {
            const element = document.querySelector(".eraser");
            if (!element.classList.contains("selected")) {
                document.querySelector(".selected").classList.remove("selected");
                element.classList.add("selected");
                prePencilColor = pencilColor;
                prePencilSize = pencilSize;
                pencilColor = "white";
                pencilSize = 64;
                cursor = 'url("./dry-clean.png") 32 32, auto';
            }
            isPencil = true;
        })
        document.querySelector(".line-large-container").addEventListener("click", () => {
            pencilSize = 7;
            prePencilSize = 7;
        })
        document.querySelector(".line-medium-container").addEventListener("click", () => {
            pencilSize = 5;
            prePencilSize = 5;
        })
        document.querySelector(".line-small-container").addEventListener("click", () => {
            pencilSize = 3;
            prePencilSize = 3;
        })
        document.querySelector(".color-black-container").addEventListener("click", () => {
            pencilColor = "black";
            prePencilColor = "black";
            document.querySelector(".selected").style.boxShadow = "black 0 0 0px 7px";
            document.querySelector(".selected").style.backgroundColor = "black";
        })
        document.querySelector(".color-red-container").addEventListener("click", () => {
            prePencilColor = "red";
            pencilColor = "red";
            document.querySelector(".selected").style.backgroundColor = "red";
            document.querySelector(".selected").style.boxShadow = "red 0 0 0px 7px";
        })
        document.querySelector(".color-green-container").addEventListener("click", () => {
            prePencilColor = "green";
            pencilColor = "green";
            document.querySelector(".selected").style.backgroundColor = "green";
            document.querySelector(".selected").style.boxShadow = "green 0 0 0px 7px";
        })

        document.querySelector(".shape-rect-container").addEventListener("click", () => {
            isPencil = false;
            shape = "rect";
            pencilSize = prePencilSize;
        })
        document.querySelector(".shape-circle-container").addEventListener("click", () => {
            isPencil = false;
            shape = "circle";
            pencilSize = prePencilSize;
        })
        document.querySelector(".shape-line-container").addEventListener("click", () => {
            isPencil = false;
            shape = "line";
            pencilSize = prePencilSize;
        })
    }, []);


    const pencilClickHandler = () => {
        document.querySelector(".canvas-pencil-bar").classList.toggle("display-none");
    }
    return (
        <div>
            <div className="canvas-controls-container">
                <button id="clear-canvas">Clear</button>
                <div >
                    <div>
                        <i className="fas fa-pencil-alt pencil selected" onClick={pencilClickHandler}></i>
                    </div>
                    <div className="canvas-pencil-bar display-none">
                        <div className="triangle-top"></div>
                        <div className="canvas-pencil-line-container">
                            <div className="fas canvas-btn-container line-large-container">
                                <div className="line-large"></div>
                            </div>
                            <div className="fas canvas-btn-container line-medium-container">
                                <div className="line-medium"></div>
                            </div>
                            <div className="fas canvas-btn-container line-small-container">
                                <div className="line-small"></div>
                            </div>
                        </div>
                        <div className="canvas-pencil-color-container">
                            <div className="fas canvas-btn-container color-black-container">
                                <div className="color-black"></div>
                            </div>
                            <div className="fas canvas-btn-container color-red-container">
                                <div className="color-red"></div>
                            </div>
                            <div className="fas canvas-btn-container color-green-container">
                                <div className="color-green"></div>
                            </div>
                        </div>
                        <div className="canvas-pencil-shape-container">
                            <div className="fas canvas-btn-container shape-rect-container">
                                <div className="shape-rect"></div>
                            </div>
                            <div className="fas canvas-btn-container shape-circle-container">
                                <div className="shape-circle"></div>
                            </div>
                            <div className="fas canvas-btn-container shape-line-container">
                                <div className="shape-line"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <i className="fas fa-eraser eraser"></i>
                </div>
                <a id="canvas-download" href="undefined" className="canvas-btn-containe">
                    <i className="fas fa-download"></i>
                </a>
            </div>
            <div className="canvas-container">
                <canvas id="canvas"></canvas>
            </div>
        </div>
    );
};
export default Canvas;
