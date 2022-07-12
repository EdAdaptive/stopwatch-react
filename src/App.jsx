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
  const [lapHistory, setLapHistory] = useState([]);
  const [finalLap, setFinalLap] = useState({
    totalTime: 0,
    startTime: 0,
  });
  const [timeInterval, setTimeInterval] = useState();
  const [worstLap, setWorstLap] = useState({ time: 0, key: 0 });
  const [bestLap, setBestLap] = useState({ time: 0, key: 0 });

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
        <h2>
          {state.currentTime === 0
            ? "00:00:00"
            : formatTime(state.currentTime, state.startTime)}
        </h2>
      </header>
      <div>
        <section className="controls">
          <LeftButton
            lapHistory={lapHistory}
            finalLap={finalLap}
            worstLap={worstLap}
            bestLap={bestLap}
            setLapHistory={setLapHistory}
            setFinalLap={setFinalLap}
            setWorstLap={setWorstLap}
            setBestLap={setBestLap}
          />
          <RightButton
            state={state}
            dispatch={dispatch}
            updateInterval={updateInterval}
          />
        </section>
        <LapContainer
          startTime={state.startTime}
          lapHistory={[...lapHistory, finalLap]}
          currentTime={state.currentTime}
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
