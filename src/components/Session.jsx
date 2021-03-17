import React from 'react';
import './Session.css';

const Session = (props) => {
  // -> state
  const currentMode = {
    backgroundColor: props.themeColor,
    color: '#151932'
  }
  const idleMode = {
    backgroundColor: 'transparent',
  }

  
  return (
    <div className="Session">
      <button 
        className="section-button"
        style={ props.mode === 'timer' ? currentMode : idleMode } >
        pomodoro
      </button>

      <button 
        className="section-button"
        style={ props.mode === 'short-break' ? currentMode : idleMode } >
        short break
      </button>

      <button 
        className="section-button"
        style={ props.mode === 'long-break' ? currentMode : idleMode } >
        long break
      </button>
    </div>
  );
} 
 
export default Session;