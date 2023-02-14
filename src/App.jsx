import React, { useState } from "react";
import "./index.css"

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const startTimer = () => {
    setIsRunning(true);
    setTimerId(
      setInterval(() => {
        setTimeLeft(timeLeft => {
          if (timeLeft === 0) {
            clearInterval(timerId);
            setIsRunning(false);
          }
          return timeLeft - 1;
        });
      }, 1000)
    );
  };

  const resetTimer = () => {
    clearInterval(timerId);
    setTimeLeft(1500);
    setIsRunning(false);
  };

  const addFiveMinutes = () => {
    setTimeLeft(timeLeft + 300);
  };

  const pauseTimer = () => {
    clearInterval(timerId);
    setIsRunning(false);
  };

  const formattedTimeLeft = timeLeft => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  };

  return (
    <main className="flex justify-center h-screen items-center bg-indigo-900">
      <div className="pomodoro-timer bg-white text-center py-10 rounded p-5">
        <div className="time-left text-7xl font-bold">
          {formattedTimeLeft(timeLeft)}
        </div>
        <div className="buttons mt-10">
          {!isRunning && (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={startTimer}
            >
              Start
            </button>
          )}
          {isRunning && (
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={pauseTimer}
            >
              Pause
            </button>
          )}
          {isRunning && (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={resetTimer}
            >
              Reset
            </button>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addFiveMinutes}
          >
            Add 5 Minutes
          </button>
        </div>
      </div>
    </main>
  );
};

export default PomodoroTimer;

