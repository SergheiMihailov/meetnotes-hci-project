import React, { FunctionComponent, CSSProperties } from "react";
import { Switch, Route } from "react-router-dom";

import MeetingView from "./MeetingView";
import ScheduleMeetingView from "./ScheduleMeetingView";
import WelcomeView from "./WelcomeView";
import TitleBar from "./TitleBar";

const style: CSSProperties = {
  flex: 3,
  display: "flex",
  flexDirection: "column",
};

const MainView: FunctionComponent = () => (
  <div style={style}>
    <TitleBar />
    <Switch>
      <Route path="/schedule-meeting">
        <ScheduleMeetingView />
      </Route>
      <Route path="/meeting">
        <MeetingView />
      </Route>
      <Route path="/">
        <WelcomeView />
      </Route>
    </Switch>
  </div>
);

export default MainView;
