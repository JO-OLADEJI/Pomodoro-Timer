import React, { useState, useRef, useEffect } from 'react';
import Session from './Session.jsx';
import Timer from './Timer.jsx';
import Tasks from './Tasks.jsx';
import Controls from './Controls.jsx';
import './App.css';

const App = () => {
  // -> State
  const adjustWidth = useRef();
  const [themeColor, setThemeColor] = useState('#F87070');
  const [lightTheme, setLightTheme] = useState('#f8707075');
  const [mode, setMode] = useState('');
  const [currentTimeSpan, setCurrentTimeSpan] = useState(0);
  const pomodoroTimerSet = [1500, 300, 1500, 300, 1500, 300, 1500, 900];
  // const pomodoroTimerSet = [15, 3, 15, 3, 15, 3, 15, 9];
  const [cycle, setCycle] = useState(-1);


  // -> functions
  const handleTasksClick = () => {
    adjustWidth.current.classList.toggle('main-and-tasks');
  }

  const handleStart = () => {
    setCycle(cycle + 1);
    
    if ([0, 2, 4, 6].includes(cycle % 8)) {
      setMode('timer');
    } else if ([1, 3, 5].includes(cycle % 8)) {
      setMode('short-break');
    } else if ([7].includes(cycle % 8)) {
      setMode('long-break');
    }

    setCurrentTimeSpan(pomodoroTimerSet[ (cycle % 8) ]);
  }


  return (
    <div  className="App">
      <div ref={ adjustWidth } className="main">
        <h1 className="title"><i class="far fa-clock"></i>Pomodoro</h1>

        <Session 
          themeColor={ themeColor } 
          mode={ mode }
        />

        <Timer 
          themeColor={ themeColor }
          time={ currentTimeSpan }
          handleStart={ handleStart }
          mode={ mode }
        />

        <Controls 
          tasksClick={ handleTasksClick } 
          themeColor={ themeColor }
        />
      </div>

      <Tasks 
        themeColor={ themeColor } 
      />
    </div>
  );
} 
 
export default App;