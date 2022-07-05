import { useState, useEffect } from "react";
import { formatTime } from "./utils/formatTime";
import "./theme/App.css";

import LeftButton from "./components/LeftButton/LeftButton";
import RightButton from "./components/RightButton/RightButton";
import LapContainer from "./components/LapContainer/LapContainer";

function App() {
  const [startTime, setStartTime] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [lapHistory, setLapHistory] = useState([]);
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
          {currentTime === 0
            ? "00:00:00"
            : formatTime(currentTime, startTime, pausedTime)}
        </h2>
      </header>
      <div>
        <section className="controls">
          <LeftButton
            isTiming={isTiming}
            startTime={startTime}
            lapHistory={lapHistory}
            setStartTime={setStartTime}
            setCurrentTime={setCurrentTime}
            setPausedTime={setPausedTime}
            setLapHistory={setLapHistory}
          />
          <RightButton
            isTiming={isTiming}
            startTime={startTime}
            pausedTime={pausedTime}
            currentTime={currentTime}
            setIsTiming={setIsTiming}
            setStartTime={setStartTime}
            setPausedTime={setPausedTime}
            updateInterval={updateInterval}
          />
        </section>
        <LapContainer
          startTime={startTime}
          lapHistory={lapHistory}
          currentTime={currentTime}
        />
      </div>
    </div>
  );
}

export default App;
