import React from "react";
import "./rightButton.css";

export default function RightButton(props) {
  function startStopwatch() {
    props.setIsTiming(true);
    if (props.startTime === 0) {
      props.setStartTime(Date.now());
    } else {
      props.setStartTime((oldState) => {
        return oldState + (Date.now() - props.currentTime);
      });
      props.setFinalLap((oldState) => {
        return {
          ...oldState,
          startTime: oldState.startTime + (Date.now() - oldState.totalTime),
        };
      });
    }
    props.updateInterval(true);
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
