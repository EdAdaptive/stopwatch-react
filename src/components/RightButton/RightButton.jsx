import React from "react";
import "./rightButton.css";

export default function RightButton(props) {
  function startStopwatch() {
    props.dispatch({ type: "START_TIMER" });
    props.updateInterval(true);
  }

  function stopStopwatch() {
    props.dispatch({ type: "STOP_TIMER" });
    props.updateInterval(false);
  }

  return (
    <button
      className={props.state.isTiming ? "stop" : "start"}
      onClick={props.state.isTiming ? stopStopwatch : startStopwatch}
    >
      {props.state.isTiming ? "Stop" : "Start"}
    </button>
  );
}
