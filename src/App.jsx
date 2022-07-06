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
  const [lapHistory, setLapHistory] = useState([
    {
      totalTime: 0,
      startTime: 0,
      pausedTime: 0,
    },
  ]);
  const [timeInterval, setTimeInterval] = useState();
  const [lapStartTime, setLapStartTime] = useState(0);
  const [lapPausedTime, setLapPausedTime] = useState(0);

  useEffect(() => {
    if (lapStartTime === 0 && isTiming) {
      setLapStartTime(Date.now());
    } else if (lapStartTime !== 0 && isTiming) {
      setLapPausedTime(lapPausedTime + Date.now() - lapStartTime);
    }
  }, [isTiming]);

  useEffect(() => {
    lapHistory[lapHistory.length - 1].pausedTime = lapPausedTime;
  }, [lapPausedTime]);

  function runStopwatch() {
    setCurrentTime(Date.now());
    setLapHistory((prevState) => {
      console.log(prevState[prevState.length - 1]);
      return [{ ...prevState[prevState.length - 1], totalTime: Date.now() }];
    });
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
            setLapStartTime={setLapStartTime}
            setLapPausedTime={setLapPausedTime}
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
          lapHistory={[...lapHistory, finalLap]}
          currentTime={currentTime}
        />
      </div>
    </div>
  );
}

export default App;
