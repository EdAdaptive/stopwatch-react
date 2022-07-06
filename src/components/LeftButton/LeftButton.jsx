import React, { useState, useEffect } from "react";

export default function LeftButton(props) {
  function lapStopwatch() {
    props.setLapHistory([
      ...props.lapHistory,
      {
        totalTime: Date.now(),
        startTime: 0,
        pausedTime: 0,
      },
    ]);

    props.setPausedTime(0);
    props.setLapStartTime(Date.now());
  }

  function resetStopwatch() {
    props.setStartTime(0);
    props.setCurrentTime(0);
    props.setPausedTime(0);
    props.setLapHistory([]);
    props.setLapStartTime(0);
  }

  return (
    <button onClick={props.isTiming ? lapStopwatch : resetStopwatch}>
      {props.isTiming ? "Lap" : "Reset"}
    </button>
  );
}
