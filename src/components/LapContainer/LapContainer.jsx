import React, { useEffect, useState } from "react";
import "./lapContainer.css";
import { formatTime } from "../../utils/formatTime";

export default function LapContainer(props) {
  const [worstLap, setWorstLap] = useState({ time: 0, key: 0 });
  const [bestLap, setBestLap] = useState({ time: 0, key: 0 });

  return (
    <section className="laps-container" aria-label="Lap history">
      {props.startTime !== 0
        ? props.lapHistory
            .map((lap, index) => {
              return (
                <div key={index + 1}>
                  <span>Lap {index + 1}</span>
                  <span>{formatTime(lap.totalTime, lap.startTime, 0)}</span>
                </div>
              );
            })
            .reverse()
        : null}
    </section>
  );
}
