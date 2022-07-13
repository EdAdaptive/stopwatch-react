import { useState, useEffect, useReducer } from "react";
import { formatTime } from "./utils/formatTime";
import * as Reducer from "./utils/mainReducer";
import "./theme/App.css";

import LeftButton from "./components/LeftButton/LeftButton";
import RightButton from "./components/RightButton/RightButton";
import LapContainer from "./components/LapContainer/LapContainer";

function App() {
  const [state, dispatch] = useReducer(
    Reducer.stopwatchReducer,
    Reducer.initialState
  );
  const [timeInterval, setTimeInterval] = useState();

  function updateInterval(state) {
    if (state) {
      setTimeInterval(
        setInterval(() => dispatch({ type: "UPDATE_TIMER" }), 1000 / 60)
      );
    } else {
      clearInterval(timeInterval);
    }
  }

  return (
    <div className="stopwatch-container">
      <header className="stopwatch-header">
        <h2>{formatTime(state.currentTime, state.startTime)}</h2>
      </header>
      <div>
        <section className="controls">
          <LeftButton state={state} dispatch={dispatch} />
          <RightButton
            state={state}
            dispatch={dispatch}
            updateInterval={updateInterval}
          />
        </section>
        <LapContainer
          startTime={state.startTime}
          lapHistory={[...state.lap.lapHistory, state.lap.finalLap]}
          currentTime={state.currentTime}
          worstLap={state.lap.worstLap}
          bestLap={state.lap.bestLap}
        />
      </div>
    </div>
  );
}

export default App;
