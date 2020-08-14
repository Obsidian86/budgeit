import React from "react";
import RTG from "react-addons-css-transition-group";
import styled from "styled-components";

const Base = ({ name, children, time }) => (
  <RTG
    transitionName={name}
    transitionAppear={true}
    transitionAppearTimeout={time}
    transitionLeaveTimeout={time}
    transitionLeave={true}
    transitionEnterTimeout={time}
  >
    {children}
  </RTG>
);

const genStyles = (name, property, start, end, time) => {
  return `
    .${name}-appear { 
      ${property}: ${start}; 
    }
    .${name}-appear.${name}-appear-active {
      ${property}: ${end}; 
      transition: ${property} ${time}ms ease-in;
    }
    .${name}-enter { 
      ${property}: ${start}; 
    }
    .${name}-enter.${name}-enter-active { 
      ${property}: ${end};
      transition: ${property} ${time}ms ease-in;
    }
    .${name}-leave { 
      ${property}: ${start}; 
    }
    .${name}-leave.${name}-leave-active {
        ${property}:${start};
        transition: ${property} ${time}ms ease-in;
    }
  `;
};

export const Fade = ({ children, time }) => {
  const name = "fade";
  const StFade = styled.span`
    ${genStyles(name, "opacity", "0", "1", time)}
  `;
  return (
    <StFade>
      <Base name={name} time={time}>
        {children}
      </Base>
    </StFade>
  );
};

export const Slide = ({ children, from, to, time }) => {
  const name = "slide";
  const StSlide = styled.span`
    ${genStyles(name, "height", from, to, time)}
  `;
  return (
    <StSlide>
      <Base name={name} time={time}>
        {children}
      </Base>
    </StSlide>
  );
};
