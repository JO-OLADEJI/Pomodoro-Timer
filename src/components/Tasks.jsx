import React, { useState, useRef } from 'react';
import TodoItem from './TodoItem';
import './Tasks.css';

const Tasks = (props) => {
  // -> State
  const [tasksToDo, setTasksToDo] = useState([]);
  const newTaskValue = useRef();

  // -> functions
  const handleCheck = (id) => {
    const newTasksToDo = tasksToDo.map(item => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setTasksToDo(newTasksToDo);
  }

  const handleDelete = (id) => {
    const newTasksToDo = tasksToDo.filter(item => {
      if (item.id !== id) {
        return item;
      }
    });
    setTasksToDo(newTasksToDo);
  }

  const pad2 = (num) => {
    num = num.toString();
    return num.length === 1 ? `0${num}` : `${num[0] + num[1]}`;
  }

  const handleAdd = (e) => {
    e.preventDefault();
    const now = new Date();
    const startOfTask = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
    const newTask = {
      id: tasksToDo.length >= 1 ? tasksToDo[(tasksToDo.length - 1)].id + 1 : 1,
      task: newTaskValue.current.value,
      completed: false,
      time: startOfTask,
      rawTime: now.valueOf()
    }
    const newTasksToDo = [];
    tasksToDo.forEach(item => newTasksToDo.push(item));
    newTasksToDo.push(newTask);
    setTasksToDo(newTasksToDo);

    newTaskValue.current.value = '';
  }
  
  return (
    <div id="Tasks" className="Tasks">
      <h1 className="title"><i class="fas fa-tasks"></i>Tasks</h1>
      <div className="items">
        { tasksToDo.map(toDo => (
          <TodoItem 
            key={toDo.id} 
            task={toDo.task} 
            id={toDo.id} 
            status={toDo.completed} 
            time={toDo.time}
            rawTime={toDo.rawTime}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />))}
      </div>
      <form className="add-task">
        <input ref={newTaskValue} type="text" placeholder="Add new task" />
        <button onClick={(e) => handleAdd(e)}><i class="fas fa-plus-circle"></i></button>
      </form>
    </div>
  );
} 
 
export default Tasks;