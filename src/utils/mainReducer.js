import { useReducer } from "react";

const initialState = {
  startTime: 0,
  isTiming: false,
  currentTime: 0,
  lap: {
    lapHistory: [],
    finalLap: {
      totalTime: 0,
      startTime: 0,
    },
    worstLap: { time: 0, key: 0 },
    bestLap: { time: 0, key: 0 },
  },
};

const stopwatchReducer = (state, action) => {
  switch (action.type) {
    case "START_TIMER":
      if (state.startTime === 0) {
        return {
          ...state,
          isTiming: true,
          startTime: Date.now(),
          lap: {
            ...state.lap,
            finalLap: { ...state.lap.finalLap, startTime: Date.now() },
          },
        };
      } else {
        return {
          ...state,
          isTiming: true,
          startTime: state.startTime + (Date.now() - state.currentTime),
          lap: {
            ...state.lap,
            finalLap: {
              ...state.lap.finalLap,
              startTime:
                state.lap.finalLap.startTime +
                (Date.now() - state.lap.finalLap.totalTime),
            },
          },
        };
      }
    case "STOP_TIMER":
      clearInterval(state.timeInterval);
      return { ...state, isTiming: false };
    case "RESET_TIMER":
      return { ...initialState };
    case "UPDATE_TIMER":
      let mostRecentTime = Date.now();
      return {
        ...state,
        lap: {
          ...state.lap,
          finalLap: { ...state.lap.finalLap, totalTime: state.currentTime },
        },
        totalTime: mostRecentTime,
        currentTime: mostRecentTime,
      };
    case "LAP_TIMER":
      if (state.lap.lapHistory.length === 1) {
        if (
          state.lap.lapHistory[0].totalTime -
            state.lap.lapHistory[0].startTime <
          state.lap.finalLap.totalTime - state.lap.finalLap.startTime
        ) {
          return {
            ...state,
            currentTime: state.currentTime,
            lap: {
              ...state.lap,
              lapHistory: [...state.lap.lapHistory, state.lap.finalLap],
              finalLap: { ...state.lap.finalLap, startTime: Date.now() },
              bestLap: {
                time:
                  state.lap.lapHistory[0].totalTime -
                  state.lap.lapHistory[0].startTime,
                key: 1,
              },
              worstLap: {
                time:
                  state.lap.finalLap.totalTime - state.lap.finalLap.startTime,
                key: 2,
              },
            },
          };
        } else {
          return {
            ...state,
            lap: {
              ...state.lap,
              lapHistory: [...state.lap.lapHistory, state.lap.finalLap],
              finalLap: { ...state.lap.finalLap, startTime: Date.now() },
              bestLap: {
                time:
                  state.lap.finalLap.totalTime - state.lap.finalLap.startTime,
                key: 2,
              },
              worstLap: {
                time:
                  state.lap.lapHistory[0].totalTime -
                  state.lap.lapHistory[0].startTime,
                key: 1,
              },
            },
          };
        }
      } else if (state.lap.lapHistory.length > 1) {
        if (
          state.lap.finalLap.totalTime - state.lap.finalLap.startTime >
          state.lap.worstLap.time
        ) {
          return {
            ...state,
            lap: {
              ...state.lap,
              lapHistory: [...state.lap.lapHistory, state.lap.finalLap],
              finalLap: { ...state.lap.finalLap, startTime: Date.now() },
              worstLap: {
                time:
                  state.lap.finalLap.totalTime - state.lap.finalLap.startTime,
                key: state.lap.lapHistory.length + 1,
              },
            },
          };
        } else if (
          state.lap.finalLap.totalTime - state.lap.finalLap.startTime <
          state.lap.bestLap.time
        ) {
          return {
            ...state,
            lap: {
              ...state.lap,
              lapHistory: [...state.lap.lapHistory, state.lap.finalLap],
              finalLap: { ...state.lap.finalLap, startTime: Date.now() },
              bestLap: {
                time:
                  state.lap.finalLap.totalTime - state.lap.finalLap.startTime,
                key: state.lap.lapHistory.length + 1,
              },
            },
          };
        }
      }

      return {
        ...state,
        lap: {
          ...state.lap,
          lapHistory: [...state.lap.lapHistory, state.lap.finalLap],
          finalLap: { ...state.lap.finalLap, startTime: Date.now() },
        },
      };
    default:
      break;
  }
};

export { stopwatchReducer, initialState };
