import React from "react";

import useState from "react";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import "./ImageSlider.css";

function ControlledCarousel() {

  let img_arr = ["./First.png", "./Second2.png"]
  let quote_arr = ["“First, solve the problem. Then, write the code.” – John Johnson", "“ Code is like humor. When you have to explain it, it’s bad.” – Cory House"];
  
  return (
    <div>

      <div
        style={{
          width: "60vw",
          margin: "auto",
          border: "black 2px solid",
          borderRadius: "5px",
          background: "black"
        }}
      >
        <Carousel>

          <Carousel.Item interval={1000}>
            <img
              className="d-block carousel-img"
              src={img_arr[0]}
              alt="First slide"
            />
            <div className="carousel_caption"><h3>{quote_arr[0]}</h3></div>
          </Carousel.Item>

          <Carousel.Item interval={1000}>
            <img
              className="d-block carousel-img"
              src={img_arr[1]}
              alt="Second slide"
              />
              <div className="carousel_caption"><h3>{quote_arr[1]}</h3></div>
          </Carousel.Item>

        </Carousel>
      </div>
    </div>
  );
}

export default ControlledCarousel;
