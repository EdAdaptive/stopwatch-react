import { useState } from "react";
import "./theme/App.css";

function App() {
  return (
    <div className="stopwatch-container">
      <header className="stopwatch-header">
        <h2>00:00.00</h2>
      </header>
      <div>
        <section className="controls">
          <button id="reset-lap">Reset</button>
          <button id="stop-start" className="start">
            Start
          </button>
        </section>
        <section className="laps-container" aria-label="Lap history"></section>
      </div>
    </div>
  );
}

export default App;
