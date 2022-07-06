import React, { useEffect, useState } from "react";
import "./lapContainer.css";
import { formatTime } from "../../utils/formatTime";

export default function LapContainer(props) {
  const [lapStartTime, setLapStartTime] = useState(0);
  const [worstLap, setWorstLap] = useState({ time: 0, key: 0 });
  const [bestLap, setBestLap] = useState({ time: 0, key: 0 });

  useEffect(() => {
    setLapStartTime(Date.now());
  }, [props.lapHistory]);

  return (
    <section className="laps-container" aria-label="Lap history">
      {props.lapHistory
        .map((lap, index) => (
          <div key={index + 1}>
            <span>Lap {index + 1}</span>
            <span>
              {formatTime(lap.totalTime, lap.startTime, lap.pausedTime)}
            </span>
          </div>
        ))
        .reverse()}
    </section>
  );
}
