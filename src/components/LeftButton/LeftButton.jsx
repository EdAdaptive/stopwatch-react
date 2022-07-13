import React, { useState, useEffect } from "react";

export default function LeftButton(props) {
  function lapStopwatch() {
    props.dispatch({ type: "LAP_TIMER" });
  }

  function resetStopwatch() {
    props.dispatch({ type: "RESET_TIMER" });
  }

  return (
    <button onClick={props.state.isTiming ? lapStopwatch : resetStopwatch}>
      {props.state.isTiming ? "Lap" : "Reset"}
    </button>
  );
}
