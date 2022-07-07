import { useState, useEffect } from "react";
import { formatTime } from "./utils/formatTime";
import "./theme/App.css";

import LeftButton from "./components/LeftButton/LeftButton";
import RightButton from "./components/RightButton/RightButton";
import LapContainer from "./components/LapContainer/LapContainer";

function App() {
  const [startTime, setStartTime] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [lapHistory, setLapHistory] = useState([]);
  const [finalLap, setFinalLap] = useState({
    totalTime: 0,
    startTime: 0,
  });
  const [timeInterval, setTimeInterval] = useState();

  useEffect(() => {
    if (finalLap.startTime === 0 && isTiming) {
      setFinalLap((prevState) => {
        return { ...prevState, startTime: Date.now() };
      });
    }
  }, [isTiming]);

  function runStopwatch() {
    setCurrentTime(Date.now());
    setFinalLap((prevState) => {
      return { ...prevState, totalTime: Date.now() };
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
            : formatTime(currentTime, startTime, 0)}
        </h2>
      </header>
      <div>
        <section className="controls">
          <LeftButton
            isTiming={isTiming}
            startTime={startTime}
            lapHistory={lapHistory}
            finalLap={finalLap}
            setStartTime={setStartTime}
            setCurrentTime={setCurrentTime}
            setLapHistory={setLapHistory}
            setFinalLap={setFinalLap}
          />
          <RightButton
            isTiming={isTiming}
            startTime={startTime}
            currentTime={currentTime}
            setIsTiming={setIsTiming}
            setStartTime={setStartTime}
            updateInterval={updateInterval}
            setFinalLap={setFinalLap}
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
