import React from 'react';
import { useStateValue } from '../StateProvider';
import './ToDoList.css';
import ToDoListComponent from './ToDoListComponent';

const ToDoList = React.memo(() => {
  // USING GLOBAL STATE
  const [{ todos }, dispatch] = useStateValue()
  

  


  return (
    <div className='todolist'>
      {todos?.map((todo) => (
        <ToDoListComponent key={todo.id} {...todo} />
      ))}
    </div>
  );
});



export default ToDoList;
