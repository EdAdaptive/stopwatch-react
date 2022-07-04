import React from "react";
import "./rightButton.css";

export default function RightButton(props) {
  function startStopwatch() {
    props.setIsTiming(true);
    props.updateInterval(true);
    if (props.startTime === 0) {
      props.setStartTime(Date.now());
    }
  }

  function stopStopwatch() {
    props.setIsTiming(false);
    props.updateInterval(false);
  }

  return (
    <button
      className={props.isTiming ? "stop" : "start"}
      onClick={props.isTiming ? stopStopwatch : startStopwatch}
    >
      {props.isTiming ? "Stop" : "Start"}
    </button>
  );
}
