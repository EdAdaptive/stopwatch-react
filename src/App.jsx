import { useState } from "react";
import { formatTime } from "./utils/formatTime";
import "./theme/App.css";

function App() {
  const [timer, setTimer] = useState("00:00.00");
  const [startTime, setStartTime] = useState();
  const [pausedTime, setPausedTime] = useState();
  const [lapState, setLapState] = useState({
    totalLaps: 0,
    startTime: 0,
    pausedTime: 0,
    bestLap: {
      time: 0,
      key: 0,
    },
    worstLap: {
      time: 0,
      key: 0,
    },
  });
  const [stopwatchAnimation, setStopwatchAnimation] = useState();
  const [isTiming, setIsTiming] = useState(false);

  const startStopwatchAnimation = () => {
    // stopwatchAnimation = runStopwatch();
  };

  function startStopwatch() {
    if (startTime === 0) {
      setStartTime(Date.now());
    } else {
      setPausedTime(Date.now() - pausedTime);
    }

    setIsTiming(true);
    if (lapState.totalLaps === 0) {
      // lapStopwatch();
    }

    setStopwatchAnimation(startStopwatchAnimation);
  }

  function stopStopwatch() {
    cancelAnimationFrame(stopwatchAnimation);
    setIsTiming(false);
  }

  return (
    <div className="stopwatch-container">
      <header className="stopwatch-header">
        <h2>{timer}</h2>
      </header>
      <div>
        <section className="controls">
          {isTiming === true ? (
            <button id="reset-lap" onClick={() => lapStopwatch()}>
              Lap
            </button>
          ) : (
            <button id="reset-lap" onClick={() => resetStopwatch()}>
              Reset
            </button>
          )}

          {isTiming === true ? (
            <button
              id="stop-start"
              className="stop"
              onClick={() => stopStopwatch()}
            >
              Stop
            </button>
          ) : (
            <button
              id="stop-start"
              className="start"
              onClick={() => startStopwatch()}
            >
              Start
            </button>
          )}
        </section>
        <section className="laps-container" aria-label="Lap history"></section>
      </div>
    </div>
  );
}

export default App;
