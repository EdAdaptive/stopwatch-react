import React, { useState, useEffect } from "react";

export default function LeftButton(props) {
  function lapStopwatch() {
    props.setLapHistory([...props.lapHistory, props.finalLap]);

    props.setFinalLap((prevState) => {
      return { ...prevState, startTime: Date.now() };
    });
  }

  function resetStopwatch() {
    props.setStartTime(0);
    props.setCurrentTime(0);
    props.setLapHistory([]);
    props.setFinalLap({
      totalTime: 0,
      startTime: 0,
    });
  }

  return (
    <button onClick={props.isTiming ? lapStopwatch : resetStopwatch}>
      {props.isTiming ? "Lap" : "Reset"}
    </button>
  );
}
