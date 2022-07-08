function padSingleDigit(time) {
  return time.toString().padStart(2, "0");
}

export function formatTime(newestTime, oldTime) {
  let calcTime = newestTime - oldTime;
  let minutes = Math.floor(calcTime / 60000);
  let seconds = Math.floor(calcTime / 1000) % 60;
  let centiseconds = Math.floor(calcTime % 100);

  return minutes < 0 || seconds < 0 || centiseconds < 0
    ? `00:00.00`
    : `${padSingleDigit(minutes)}:${padSingleDigit(seconds)}.${padSingleDigit(
        centiseconds
      )}`;
}
