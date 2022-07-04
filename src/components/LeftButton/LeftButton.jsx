import React from "react";

export default function LeftButton(props) {
  function lapStopwatch() {}

  function resetStopwatch() {
    props.setStartTime(0);
    props.setCurrentTime(0);
    props.setPausedTime(0);
  }

  return (
    <button onClick={props.isTiming ? lapStopwatch : resetStopwatch}>
      {props.isTiming ? "Lap" : "Reset"}
    </button>
  );
}
