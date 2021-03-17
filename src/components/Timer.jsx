import React, { useEffect, useRef, useState } from 'react';
import './Timer.css';
import beep from '../audio/beep.wav';

const Timer = (props) => {
  // -> State
  const [totalLength, setTotalLength] = useState(0);
  const [testPomodoro, setTestPomodoro] = useState('25:00');
  const [elapsedSec, setElapsedSec] = useState(0);
  const progressRing = useRef();
  const startButton = useRef();


  // -> functions
  const integerDivision = (float) => {
    return Math.floor(float);
  }
  
  // @param time - int[seconds]
  const countDown = (time) => {
    let beepSound = new Audio(beep);
    let countForward = new Date().valueOf() + (time * 1000);
    let countdown = integerDivision((countForward - new Date().valueOf()) / 1000);
    startButton.current.classList.add('fade-button');

    let counting = setInterval(() => {
      countdown = integerDivision((countForward - new Date().valueOf()) / 1000);
      countdown >= 0 ? setTestPomodoro(minSecTime(countdown)) : clearInterval(counting);
      
      if (countdown <= 0) {
        clearInterval(counting);
        startButton.current.classList.remove('fade-button');
        beepSound.play();
      }
    }, 0.35 * 1000);
  }

  // @param milliTime - int[seconds]
  const minSecTime = (milliTime) => {
    setElapsedSec(milliTime);
    const pad2 = (num) => {
      num = num.toString();
      return num.length === 1 ? `0${num}` : `${num[0] + num[1]}`;
    }
    let minutes = pad2( integerDivision(milliTime / 60) );
    let seconds = pad2( integerDivision(milliTime % 60) );
    return `${minutes}:${seconds}`;
  }

  useEffect(() => {
    setTotalLength(progressRing.current.getTotalLength());
    countDown(props.time);
  }, [props.mode]);
  
  return (
    <div className="Timer">
      <div className="time-Box">
      <svg
        class="progress-ring"
        height="320"
        width="320"
      >
        <circle
          class="progress-ring-circle"
          stroke="#F87070"
          stroke-width="8"
          fill="transparent"
          r="140"
          cx="160"
          cy="160"
          ref={ progressRing }
          strokeDasharray={ totalLength }
          strokeDashoffset={ (elapsedSec / props.time) * totalLength }
        />
      </svg>
      <div className="counter">
        <h1>{ testPomodoro }</h1>
        <button ref={ startButton } onClick={ props.handleStart }>START</button>
      </div>
      </div>
    </div>
  );
} 
 
export default Timer;