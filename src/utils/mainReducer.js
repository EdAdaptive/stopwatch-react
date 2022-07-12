import { useReducer } from "react";

const initialState = {
  startTime: 0,
  isTiming: false,
  currentTime: 0,
  lapHistory: [],
  finalLap: { totalTime: 0, startTime: 0 },
  worstLap: { time: 0, key: 0 },
  bestLap: { time: 0, key: 0 },
  timeInterval: undefined,
};

const stopwatchReducer = (state, action) => {
  switch (action.type) {
    case "START_TIMER":
      if (state.startTime === 0) {
        return {
          ...state,
          isTiming: true,
          startTime: Date.now(),
        };
      } else {
        return {
          ...state,
          isTiming: true,
          startTime: state.startTime + (Date.now() - state.currentTime),
          finalLap: {
            ...state.finalLap,
            startTime:
              state.finalLap.startTime +
              (Date.now() - state.finalLap.totalTime),
          },
        };
      }
    case "STOP_TIMER":
      clearInterval(state.timeInterval);
      return { ...state, isTiming: false };
    case "RESET_TIMER":
      break;
    case "UPDATE_TIMER":
      let mostRecentTime = Date.now();
      return {
        ...state,
        totalTime: mostRecentTime,
        currentTime: mostRecentTime,
      };
      break;
    default:
      break;
  }
};

export { stopwatchReducer, initialState };
