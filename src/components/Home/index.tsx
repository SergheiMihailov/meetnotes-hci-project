import React, { FunctionComponent } from "react";
import Footer from "../Footer";
import MainView from "../MainView";
import Recorder from "../Recorder";
import SideMenu from "../SideMenu";

const style = {
  height: "100vh",
  background: "gray",
  padding: "2% 2% 2% 2%",
};

const bodyStyle = {
  display: "flex",
  width: "100%",
  height: "100%",
};

const Home: FunctionComponent = () => (
  <div style={style}>
    <div style={bodyStyle}>
      <SideMenu />
      <MainView />
    </div>
    <Footer />
    <Recorder />
  </div>
);

export default Home;
