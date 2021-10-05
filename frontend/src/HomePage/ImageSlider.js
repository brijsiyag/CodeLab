import React from "react";
import useState from "react";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import "./ImageSlider.css";
function ControlledCarousel() {
  return (
    <div
      style={{
        width: "60vw",
        margin: "auto",
        border: "black 2px solid",
        borderRadius: "5px",
      }}
    >
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block carousel-img"
            src="./First.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>
              “First, solve the problem. Then, write the code.” – John Johnson.
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block carousel-img"
            src="./Second.png"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>
              “ Code is like humor. When you have to explain it, it’s bad.” –
              Cory House
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block carousel-img"
            src="./First.png"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>
              “ Code is like humor. When you have to explain it, it’s bad.” –
              Cory House
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;
