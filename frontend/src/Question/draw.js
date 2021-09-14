const draw = setTimeout(() => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = (7 * window.innerWidth) / 10;
    canvas.height = (7 * window.innerHeight) / 10;
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    var pencilColor = "black", pencilSize = 3;
    ctx.beginPath();
    let drawing = false;
    let hidden = false;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    const draw = (e) => {
        console.log(pencilColor);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.lineWidth = pencilSize;
        ctx.lineCap = "round";
        ctx.strokeStyle = pencilColor;
        ctx.stroke();
        ctx.moveTo(e.offsetX, e.offsetY);
    };
    window.addEventListener("mousemove", (e) => {
        if (drawing && !hidden) {
            draw(e);
        }
    });
    window.addEventListener("mousedown", (e) => {
        drawing = true;
        draw(e);
    });
    window.addEventListener("mouseout", (e) => {
        drawing = false;
        ctx.beginPath();
    });
    window.addEventListener("mouseenter", () => {
        window.addEventListener("mousedown", (e) => {
            drawing = true;
            draw(e);
        });
    });
    window.addEventListener("mouseup", (e) => {
        drawing = false;
        ctx.beginPath();
    });
    document.querySelector("#clear-canvas").addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fill();
    });
    document.querySelector("#canvas-download").addEventListener("click", () => {
        var link = document.getElementById("canvas-download");
        link.setAttribute("download", "MintyPaper.jpg");
        link.setAttribute(
            "href",
            canvas.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream")
        );
        link.click();
    });
    document.querySelector(".pencil").addEventListener("click", () => {
        pencilColor = "black";
        pencilSize = 3;
    })
    document.querySelector(".eraser").addEventListener("click", () => {
        pencilColor = "white";
        pencilSize = 30;
    })
}, 0);
export default draw;