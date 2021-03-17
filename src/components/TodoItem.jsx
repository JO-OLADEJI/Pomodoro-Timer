import React, { useState, useRef, useEffect } from 'react';
import './TodoItem.css';

const TodoItem = (props) => {
  // -> State
  const [duration, setDuration] = useState(0);
  const doneTask = useRef();

  // -> functions
  useEffect(() => {
    if (props.status) {
      const taskDuration = Math.floor((new Date().valueOf() - props.rawTime) / 60000);
      setDuration(taskDuration);
      doneTask.current.classList.add('done-task');
    }
    if (!props.status) {
      doneTask.current.classList.remove('done-task');
    }
  }, [props.status]);
  

  return (
    <div className="TodoItem">
      <div className="line">
        <input
          type="checkbox"
          checked={props.status}
          onChange={() => props.handleCheck(props.id)}
        />
        <h3 ref={doneTask} className="exercise">{props.task}</h3>
      </div>
      <div className="apart">
        <div className="time">{!props.status ? props.time :
          <span>
            <i class="fas fa-arrows-alt-h"></i>
            <span> {duration} min(s)</span>
          </span>}
        </div>
        <i onClick={() => props.handleDelete(props.id)} class="fas fa-trash"></i>
      </div>
    </div>
  );
} 

export default TodoItem;