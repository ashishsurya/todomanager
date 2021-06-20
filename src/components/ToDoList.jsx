import { useEffect, useState } from 'react';
import { db } from '../firebase';
import './ToDoList.css';
import ToDoListComponent from './ToDoListComponent';

const ToDoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = () => {
      db.collection('todos').onSnapshot((todoSnapshot) =>
        setTodos(
          todoSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      );
    };
    unsubscribe();
  }, []);

  console.log(todos);

  return (
    <div className='todolist'>
      {todos.map((todo) => (
        <ToDoListComponent key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export default ToDoList;
