import React from 'react';
import './Controls.css';

const Controls = (props) => {
  // -> State
  const style = {
    color: props.themeColor
  }
  
  return (
    <div className="Controls">
      <i onClick={ props.tasksClick } className="fas fa-tasks" style={ style }></i>
    </div>
  );
}
 
export default Controls;