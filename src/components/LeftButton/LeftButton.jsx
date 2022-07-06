import React, { useState, useEffect } from "react";

export default function LeftButton(props) {
  const [lapStartTime, setLapStartTime] = useState(0);
  const [pausedTime, setPausedTime] = useState(0);

  useEffect(() => {
    if (lapStartTime === 0 && props.isTiming) {
      setLapStartTime(Date.now());
    }
  }, [props.isTiming]);

  function lapStopwatch() {
    props.setLapHistory([
      ...props.lapHistory,
      {
        totalTime: Date.now(),
        startTime: lapStartTime,
        pausedTime: 0,
      },
    ]);

    setLapStartTime(Date.now());
  }

  function resetStopwatch() {
    props.setStartTime(0);
    props.setCurrentTime(0);
    props.setPausedTime(0);
    props.setLapHistory([]);
    setLapStartTime(0);
  }

  return (
    <button onClick={props.isTiming ? lapStopwatch : resetStopwatch}>
      {props.isTiming ? "Lap" : "Reset"}
    </button>
  );
}
