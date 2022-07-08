import React, { useEffect, useState } from "react";
import "./lapContainer.css";
import { formatTime } from "../../utils/formatTime";

export default function LapContainer(props) {
  return (
    <section className="laps-container" aria-label="Lap history">
      {props.startTime !== 0
        ? props.lapHistory
            .map((lap, index) => {
              return (
                <div
                  key={index + 1}
                  className={[
                    index + 1 == props.bestLap.key ? "highest-lap" : null,
                    index + 1 == props.worstLap.key ? "worst-lap" : null,
                  ]}
                >
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
