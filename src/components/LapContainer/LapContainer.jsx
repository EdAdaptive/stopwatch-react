import React, { useState } from "react";
import "./lapContainer.css";
import { formatTime } from "../../utils/formatTime";

export default function LapContainer(props) {
  const [totalLaps, setTotalLaps] = useState(0);
  const [worstLap, setWorstLap] = useState({ time: 0, key: 0 });
  const [bestLap, setBestLap] = useState({ time: 0, key: 0 });

  return (
    <section className="laps-container" aria-label="Lap history">
      {props.lapHistory.map((lap, index) => (
        <div key={index + 1}>
          <span>Lap {index + 1}</span>
          <span>{formatTime(lap, props.startTime, 0)}</span>
        </div>
      ))}
    </section>
  );
}
