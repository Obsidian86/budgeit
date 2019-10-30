import React from "react";
import RTG from "react-addons-css-transition-group";
import "./Fade.css";

const TT = ({ children }) => (
  <RTG
    transitionName="fadeIn"
    transitionAppear={true}
    transitionAppearTimeout={120}
    transitionLeaveTimeout={120}
    transitionLeave={true}
    transitionEnterTimeout={120}
  >
    {children}
  </RTG>
);

export default TT;