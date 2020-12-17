import React, { FunctionComponent, CSSProperties } from "react";
import { Carousel } from "react-bootstrap";

const style: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  height: "80vh",
  backgroundColor: "gray",
};

const WelcomeView: FunctionComponent = () => (
  <Carousel style={style}>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={require("./resources/1.JPG")}
        alt="First slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={require("./resources/2.JPG")}
        alt="First slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={require("./resources/3.JPG")}
        alt="First slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={require("./resources/4.JPG")}
        alt="First slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={require("./resources/5.JPG")}
        alt="First slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={require("./resources/6.JPG")}
        alt="First slide"
      />
    </Carousel.Item>
  </Carousel>
);

export default WelcomeView;
