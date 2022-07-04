import { useState, useEffect } from "react";
import { formatTime } from "./utils/formatTime";
import "./theme/App.css";

import LeftButton from "./components/LeftButton/LeftButton";
import RightButton from "./components/RightButton/RightButton";

function App() {
  const [startTime, setStartTime] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [timeInterval, setTimeInterval] = useState();

  function runStopwatch() {
    setCurrentTime(Date.now());
  }

  function updateInterval(state) {
    if (state) {
      setTimeInterval(setInterval(() => runStopwatch(), 1000 / 60));
    } else {
      clearInterval(timeInterval);
    }
  }

  return (
    <div className="stopwatch-container">
      <header className="stopwatch-header">
        <h2>
          {startTime === 0
            ? "00:00:00"
            : formatTime(currentTime, startTime, pausedTime)}
        </h2>
      </header>
      <div>
        <section className="controls">
          <LeftButton
            isTiming={isTiming}
            startTime={startTime}
            setStartTime={setStartTime}
            setCurrentTime={setCurrentTime}
            setPausedTime={setPausedTime}
          />
          <RightButton
            isTiming={isTiming}
            startTime={startTime}
            pausedTime={pausedTime}
            setIsTiming={setIsTiming}
            setStartTime={setStartTime}
            setPausedTime={setPausedTime}
            updateInterval={updateInterval}
          />
        </section>
        <section className="laps-container" aria-label="Lap history"></section>
      </div>
    </div>
  );
}

export default App;
