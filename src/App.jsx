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
  const [worstLap, setWorstLap] = useState({ time: 0, key: 0 });
  const [bestLap, setBestLap] = useState({ time: 0, key: 0 });

  useEffect(() => {
    if (finalLap.startTime === 0 && isTiming) {
      setFinalLap((prevState) => {
        return { ...prevState, startTime: Date.now() };
      });
    }
  }, [isTiming]);

  useEffect(() => {
    if (lapHistory.length === 1) {
      setWorstLap({ time: 0, key: 0 });
      setBestLap({ time: 0, key: 0 });
    } else if (lapHistory.length === 2) {
      if (
        lapHistory[0].totalTime - lapHistory[0].startTime >
        lapHistory[1].totalTime - lapHistory[1].startTime
      ) {
        setWorstLap({
          time: lapHistory[0].totalTime - lapHistory[0].startTime,
          key: 1,
        });
        setBestLap({
          time: lapHistory[1].totalTime - lapHistory[1].startTime,
          key: 2,
        });
      } else {
        setWorstLap({
          time: lapHistory[1].totalTime - lapHistory[1].startTime,
          key: 2,
        });
        setBestLap({
          time: lapHistory[0].totalTime - lapHistory[0].startTime,
          key: 1,
        });
      }
    } else if (lapHistory.length > 2) {
      if (
        lapHistory[lapHistory.length - 1].totalTime -
          lapHistory[lapHistory.length - 1].startTime >
        worstLap.time
      ) {
        setWorstLap(() => {
          return {
            time:
              lapHistory[lapHistory.length - 1].totalTime -
              lapHistory[lapHistory.length - 1].startTime,
            key: lapHistory.length,
          };
        });
      } else if (
        lapHistory[lapHistory.length - 1].totalTime -
          lapHistory[lapHistory.length - 1].startTime <
        bestLap.time
      ) {
        setBestLap(() => {
          return {
            time:
              lapHistory[lapHistory.length - 1].totalTime -
              lapHistory[lapHistory.length - 1].startTime,
            key: lapHistory.length,
          };
        });
      }
    }
  }, [lapHistory]);

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
            worstLap={worstLap}
            bestLap={bestLap}
            setStartTime={setStartTime}
            setCurrentTime={setCurrentTime}
            setLapHistory={setLapHistory}
            setFinalLap={setFinalLap}
            setWorstLap={setWorstLap}
            setBestLap={setBestLap}
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
          worstLap={worstLap}
          bestLap={bestLap}
          setWorstLap={setWorstLap}
          setBestLap={setBestLap}
        />
      </div>
    </div>
  );
}

export default App;
