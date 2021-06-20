import { useEffect, useState } from 'react';
import { db } from '../firebase';
import './ToDoList.css';

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

  return (<div className='todolist'>List of todos come here
  </div>);
};

export default ToDoList;
